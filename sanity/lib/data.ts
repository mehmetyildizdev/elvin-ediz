import { createClient } from 'next-sanity';
import { draftMode } from 'next/headers';
import {
  defaultSiteSettings,
  defaultHomePage,
  defaultStaff,
  defaultServices,
  defaultServicesPage,
  defaultTestimonials,
  defaultGoogleReviews,
  defaultInsightsPage,
  defaultPosts,
  defaultFaqPage,
  defaultPrivacyPage,
  defaultAboutPage,
} from '@/data/defaults';
import type {
  SiteSettingsData,
  HomePageData,
  ServiceData,
  ServicesPageData,
  StaffData,
  TestimonialData,
  GoogleReviewsData,
  InsightsPageData,
  PostData,
  PostKind,
  FaqPageData,
  PrivacyPageData,
  AboutPageData,
} from './types';

export * from './types';
export * from './whatsapp';

/**
 * Creates and returns an active Sanity client for server components.
 */
export async function getSanityClient() {
  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
  if (!projectId) return null;

  const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
  let isDraft = false;
  try {
    const draft = await draftMode();
    isDraft = draft.isEnabled;
  } catch {
    isDraft = false;
  }

  const isDev = process.env.NODE_ENV === 'development';

  return createClient({
    projectId,
    dataset,
    apiVersion: '2026-07-14',
    // Never use CDN in development or draft mode for instant updates
    useCdn: !isDraft && !isDev,
    perspective: isDraft ? 'drafts' : 'published',
    stega: {
      enabled: isDraft,
      studioUrl:
        process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
        (isDev ? 'http://localhost:3333' : 'https://elvin-ediz.sanity.studio'),
    },
    token: isDraft
      ? process.env.SANITY_EDITOR_TOKEN || process.env.SANITY_API_READ_TOKEN
      : undefined,
  });
}

const isDev = process.env.NODE_ENV === 'development';
const getFetchOptions = (tags: string[]) => ({
  next: {
    revalidate: isDev ? 0 : 1209600,
    tags,
  },
});

/**
 * Standardized GROQ helper for localized single documents with 3-tier language fallback:
 * 1. Matching target language ($lang)
 * 2. English fallback (or unilingual legacy doc)
 * 3. Any existing document of the type
 */
function localizedDocQuery(type: string, projection: string = '...'): string {
  return `coalesce(
    *[_type == "${type}" && language == $lang][0],
    *[_type == "${type}" && (language == "en" || !defined(language))][0],
    *[_type == "${type}" || _id == "${type}"][0]
  ) { ${projection} }`;
}

/**
 * Reusable helper to fetch a single localized document from Sanity with safe fallback merging.
 */
async function fetchSingleDoc<T extends Record<string, any>>(
  query: string,
  lang: string,
  fallback: T,
  tags: string[],
  isValid: (data: Partial<T>) => boolean = () => true
): Promise<T> {
  const client = await getSanityClient();
  if (!client) return fallback;

  try {
    const data = await client.fetch<Partial<T>>(query, { lang }, getFetchOptions(tags));
    if (data && isValid(data)) {
      return { ...fallback, ...data };
    }
  } catch (err) {
    console.error(`[Sanity Fetch Error] Query failed:`, err);
  }

  return fallback;
}

// ----------------------------------------------------------------------
// Page & Layout Fetchers
// ----------------------------------------------------------------------

export async function fetchSiteSettings(lang: string = 'en'): Promise<SiteSettingsData> {
  const query = localizedDocQuery(
    'siteSettings',
    `..., "defaultOgImageUrl": defaultOgImage.asset->url`
  );
  return fetchSingleDoc<SiteSettingsData>(
    query,
    lang,
    defaultSiteSettings,
    ['siteSettings', `siteSettings:${lang}`],
    (d) => Boolean(d.siteTitle)
  );
}

export async function fetchHomePage(lang: string = 'en'): Promise<HomePageData> {
  const query = localizedDocQuery(
    'homePage',
    `
    ...,
    "ciccBadgeImageUrl": ciccBadgeImage.asset->url,
    "whoAreWeImageUrl": whoAreWeImage.asset->url,
    "aboutImageUrl": aboutImage.asset->url,
    "seo": seo { ..., "ogImageUrl": ogImage.asset->url }
  `
  );
  return fetchSingleDoc<HomePageData>(
    query,
    lang,
    defaultHomePage,
    ['homePage', `homePage:${lang}`],
    (d) => Boolean(d.heroTitle || d.strategyTitle || d.strategyEyebrow)
  );
}

export async function fetchAboutPage(lang: string = 'en'): Promise<AboutPageData> {
  const query = localizedDocQuery(
    'aboutPage',
    `
    ...,
    "ciccBadgeImageUrl": ciccBadgeImage.asset->url,
    "strategyImageUrl": strategyImage.asset->url,
    "seo": seo { ..., "ogImageUrl": ogImage.asset->url }
  `
  );
  return fetchSingleDoc<AboutPageData>(
    query,
    lang,
    defaultAboutPage,
    ['aboutPage', `aboutPage:${lang}`],
    (d) => Boolean(d.titleMain || d.eyebrow || d.whoAreWeTitle || d.strategyTitleMain)
  );
}

export async function fetchServicesPage(lang: string = 'en'): Promise<ServicesPageData> {
  const query = localizedDocQuery(
    'servicesPage',
    `..., "seo": seo { ..., "ogImageUrl": ogImage.asset->url }`
  );
  return fetchSingleDoc<ServicesPageData>(
    query,
    lang,
    defaultServicesPage,
    ['servicesPage', `servicesPage:${lang}`],
    (d) => Boolean(d.titleMain)
  );
}

export async function fetchInsightsPage(lang: string = 'en'): Promise<InsightsPageData> {
  const query = localizedDocQuery(
    'insightsPage',
    `..., "seo": seo { ..., "ogImageUrl": ogImage.asset->url }`
  );
  return fetchSingleDoc<InsightsPageData>(
    query,
    lang,
    defaultInsightsPage,
    ['insightsPage', `insightsPage:${lang}`],
    (d) => Boolean(d.titleMain || d.eyebrow)
  );
}

export async function fetchFaqPage(lang: string = 'en'): Promise<FaqPageData> {
  const query = localizedDocQuery(
    'faqPage',
    `..., "seo": seo { ..., "ogImageUrl": ogImage.asset->url }`
  );
  return fetchSingleDoc<FaqPageData>(
    query,
    lang,
    defaultFaqPage,
    ['faqPage', `faqPage:${lang}`],
    (d) => Boolean(d.titleMain || d.eyebrow || d.items?.length)
  );
}

export async function fetchPrivacyPage(lang: string = 'en'): Promise<PrivacyPageData> {
  const query = localizedDocQuery(
    'privacyPage',
    `..., "seo": seo { ..., "ogImageUrl": ogImage.asset->url }`
  );
  return fetchSingleDoc<PrivacyPageData>(
    query,
    lang,
    defaultPrivacyPage,
    ['privacyPage', `privacyPage:${lang}`],
    (d) => Boolean(d.titleMain || d.eyebrow || d.commitmentTitle || d.content?.length)
  );
}

// ----------------------------------------------------------------------
// Collections & Entity Fetchers
// ----------------------------------------------------------------------

export async function fetchStaff(lang: string = 'en'): Promise<StaffData[]> {
  const client = await getSanityClient();
  if (!client) return defaultStaff;

  try {
    const query = `*[_type == "staffMember" && (language == $lang || (!defined(language) && $lang == "en"))] | order(order asc) {
      _id, name, designation, role, subtitle, bio, email, order,
      "photoUrl": photo.asset->url
    }`;
    let data = await client.fetch<StaffData[]>(query, { lang }, getFetchOptions(['staffMember', `staffMember:${lang}`]));

    if ((!data || data.length === 0) && lang !== 'en') {
      data = await client.fetch<StaffData[]>(
        `*[_type == "staffMember" && (language == "en" || !defined(language))] | order(order asc) {
          _id, name, designation, role, subtitle, bio, email, order,
          "photoUrl": photo.asset->url
        }`,
        {},
        getFetchOptions(['staffMember', 'staffMember:en'])
      );
    }
    if (data?.length) return data;
  } catch (err) {
    console.error('Error fetching staffMember from Sanity:', err);
  }
  return defaultStaff;
}

export async function fetchServices(lang: string = 'en'): Promise<ServiceData[]> {
  const client = await getSanityClient();
  if (!client) return defaultServices;

  try {
    const serviceFields = `
      _id, title, "slug": slug.current, order, iconName, summary, features, body,
      ctaTitle, ctaSubtitle, ctaButtonText, ctaButtonLink,
      "coverImageUrl": coverImage.asset->url,
      "seo": seo { ..., "ogImageUrl": ogImage.asset->url }
    `;

    let data = await client.fetch<ServiceData[]>(
      `*[_type == "service" && (language == $lang || (!defined(language) && $lang == "en"))] | order(order asc) { ${serviceFields} }`,
      { lang },
      getFetchOptions(['services', `services:${lang}`])
    );

    if ((!data || data.length === 0) && lang !== 'en') {
      data = await client.fetch<ServiceData[]>(
        `*[_type == "service" && (language == "en" || !defined(language))] | order(order asc) { ${serviceFields} }`,
        {},
        getFetchOptions(['services', 'services:en'])
      );
    }
    if (data?.length) return data;
  } catch (err) {
    console.error('Error fetching services from Sanity:', err);
  }
  return defaultServices;
}

export async function fetchServiceBySlug(
  slug: string,
  lang: string = 'en',
  strict: boolean = false
): Promise<ServiceData | null> {
  const client = await getSanityClient();
  if (!client) return defaultServices.find((s) => s.slug === slug) || defaultServices[0];

  const serviceFields = `
    _id, title, "slug": slug.current, order, iconName, summary, features, body,
    ctaTitle, ctaSubtitle, ctaButtonText, ctaButtonLink,
    "coverImageUrl": coverImage.asset->url,
    "seo": seo { ..., "ogImageUrl": ogImage.asset->url }
  `;

  try {
    const query = strict
      ? `coalesce(
          *[_type == "service" && slug.current == $slug && (language == $lang || (!defined(language) && $lang == "en"))][0],
          *[_type == "translation.metadata" && count((translations[].value._ref)[@ in *[_type == "service" && slug.current == $slug]._id]) > 0][0].translations[language == $lang][0].value->
        ) { ${serviceFields} }`
      : `coalesce(
          *[_type == "service" && slug.current == $slug && language == $lang][0],
          *[_type == "service" && slug.current == $slug][0]
        ) { ${serviceFields} }`;

    const data = await client.fetch<ServiceData>(
      query,
      { slug, lang },
      getFetchOptions([`service:${slug}`, `service:${slug}:${lang}`])
    );
    if (data) return data;
  } catch (err) {
    console.error('Error fetching service by slug from Sanity:', err);
  }

  if (!strict) return defaultServices.find((s) => s.slug === slug) || defaultServices[0];
  return null;
}

export async function fetchTestimonials(lang: string = 'en'): Promise<TestimonialData[]> {
  const client = await getSanityClient();
  if (!client) return defaultTestimonials;

  try {
    let data = await client.fetch<TestimonialData[]>(
      `*[_type == "testimonial" && (language == $lang || (!defined(language) && $lang == "en"))] | order(order asc) { _id, author, location, quote, rating }`,
      { lang },
      getFetchOptions(['testimonial', `testimonial:${lang}`])
    );

    if ((!data || data.length === 0) && lang !== 'en') {
      data = await client.fetch<TestimonialData[]>(
        `*[_type == "testimonial" && (language == "en" || !defined(language))] | order(order asc) { _id, author, location, quote, rating }`,
        {},
        getFetchOptions(['testimonial', 'testimonial:en'])
      );
    }
    if (data?.length) return data;
  } catch (err) {
    console.error('Error fetching testimonials from Sanity:', err);
  }
  return defaultTestimonials;
}

export async function fetchGoogleReviews(): Promise<GoogleReviewsData> {
  const client = await getSanityClient();
  if (!client) return defaultGoogleReviews;

  try {
    const data = await client.fetch<GoogleReviewsData>(
      `*[_type == "googleReviews"][0] {
        _id, businessName, rating, totalReviews, googleMapsUrl, writeReviewUrl, lastSyncedAt, reviews
      }`,
      {},
      getFetchOptions(['googleReviews'])
    );
    if (data && data.reviews?.length) return { ...defaultGoogleReviews, ...data };
  } catch (err) {
    console.error('Error fetching googleReviews from Sanity:', err);
  }
  return defaultGoogleReviews;
}

// ----------------------------------------------------------------------
// Posts & Content Fetchers
// ----------------------------------------------------------------------

const postProjection = `
  ...,
  "slug": slug.current,
  "coverImageUrl": coverImage.asset->url,
  "authorName": coalesce(
    customAuthorName,
    *[_type == "translation.metadata" && count((translations[].value._ref)[@ == ^.author._ref]) > 0][0].translations[language == $lang][0].value->name,
    *[_type == "staffMember" && language == $lang && (name match "*Nazly*" || _id match "*nazly*")][0].name,
    author->name,
    authorName,
    "Nazly Sunguroglu, RCIC"
  ),
  "authorRole": coalesce(
    customAuthorRole,
    *[_type == "translation.metadata" && count((translations[].value._ref)[@ == ^.author._ref]) > 0][0].translations[language == $lang][0].value->role,
    *[_type == "staffMember" && language == $lang && (name match "*Nazly*" || _id match "*nazly*")][0].role,
    author->role,
    authorRole,
    "Regulated Canadian Immigration Consultant"
  ),
  "authorPhotoUrl": coalesce(
    *[_type == "translation.metadata" && count((translations[].value._ref)[@ == ^.author._ref]) > 0][0].translations[language == $lang][0].value->photo.asset->url,
    *[_type == "staffMember" && language == $lang && (name match "*Nazly*" || _id match "*nazly*")][0].photo.asset->url,
    author->photo.asset->url
  ),
  "seo": seo { ..., "ogImageUrl": ogImage.asset->url }
`;

export async function fetchPosts(
  kind?: PostKind | string,
  lang: string = 'en'
): Promise<PostData[]> {
  const client = await getSanityClient();
  if (!client) {
    if (!kind) return defaultPosts;
    return defaultPosts.filter((p) => p.kind === kind);
  }

  try {
    const query = kind
      ? `*[_type == "post" && (language == $lang || (!defined(language) && $lang == "en")) && kind == $kind] | order(publishedAt desc) { ${postProjection} }`
      : `*[_type == "post" && (language == $lang || (!defined(language) && $lang == "en"))] | order(publishedAt desc) { ${postProjection} }`;

    const tags = ['posts', `posts:${lang}`, ...(kind ? [`posts:${kind}`, `posts:${kind}:${lang}`] : [])];
    let data = await client.fetch<PostData[]>(query, kind ? { kind, lang } : { lang }, getFetchOptions(tags));

    if ((!data || data.length === 0) && lang !== 'en') {
      const fallbackQuery = kind
        ? `*[_type == "post" && (language == "en" || !defined(language)) && kind == $kind] | order(publishedAt desc) { ${postProjection} }`
        : `*[_type == "post" && (language == "en" || !defined(language))] | order(publishedAt desc) { ${postProjection} }`;
      data = await client.fetch<PostData[]>(fallbackQuery, kind ? { kind, lang: 'en' } : { lang: 'en' }, getFetchOptions(['posts', 'posts:en']));
    }

    if (data?.length) return data;
  } catch (err) {
    console.error('Error fetching posts from Sanity:', err);
  }

  if (!kind) return defaultPosts;
  return defaultPosts.filter((p) => p.kind === kind);
}

export async function fetchPostBySlug(
  slug: string,
  lang: string = 'en',
  strict: boolean = false
): Promise<PostData | null> {
  const client = await getSanityClient();
  if (!client) return defaultPosts.find((p) => p.slug === slug) || null;

  try {
    const query = strict
      ? `coalesce(
          *[_type == "post" && slug.current == $slug && (language == $lang || (!defined(language) && $lang == "en"))][0],
          *[_type == "translation.metadata" && count((translations[].value._ref)[@ in *[_type == "post" && slug.current == $slug]._id]) > 0][0].translations[language == $lang][0].value->
        ) { ${postProjection} }`
      : `coalesce(
          *[_type == "post" && slug.current == $slug && language == $lang][0],
          *[_type == "post" && slug.current == $slug][0]
        ) { ${postProjection} }`;

    const data = await client.fetch<PostData>(query, { slug, lang }, getFetchOptions([`post:${slug}`, `post:${slug}:${lang}`]));
    if (data) return data;
  } catch (err) {
    console.error('Error fetching post by slug from Sanity:', err);
  }

  if (!strict) return defaultPosts.find((p) => p.slug === slug) || null;
  return null;
}

export async function fetchAllPostSlugsWithLang(
  kind?: PostKind | string
): Promise<{ lang: string; slug: string }[]> {
  const client = await getSanityClient();
  if (!client) {
    const list = kind ? defaultPosts.filter((p) => p.kind === kind) : defaultPosts;
    return list.map((p) => ({ lang: 'en', slug: p.slug }));
  }

  try {
    const query = kind
      ? `*[_type == "post" && kind == $kind && defined(slug.current)] {
          "slug": slug.current,
          "lang": coalesce(language, "en")
        }`
      : `*[_type == "post" && defined(slug.current)] {
          "slug": slug.current,
          "lang": coalesce(language, "en")
        }`;
    const data = await client.fetch<{ lang: string; slug: string }[]>(query, kind ? { kind } : {}, getFetchOptions(['posts']));
    if (data?.length) return data;
  } catch (err) {
    console.error('Error fetching post slugs with lang from Sanity:', err);
  }

  const list = kind ? defaultPosts.filter((p) => p.kind === kind) : defaultPosts;
  return list.map((p) => ({ lang: 'en', slug: p.slug }));
}
