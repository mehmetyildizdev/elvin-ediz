import { createClient } from 'next-sanity';
import { draftMode } from 'next/headers';
import {
  backupSiteSettings,
  backupHomePage,
  backupStaff,
  backupServices,
  backupServicesPage,
  backupTestimonials,
  backupGoogleReviews,
  backupInsightsPage,
  backupPosts,
  backupFaqPage,
  backupPrivacyPage,
} from './backupData';
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
} from './types';

export * from './types';

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

export async function fetchSiteSettings(lang: string = 'en'): Promise<SiteSettingsData> {
  const client = await getSanityClient();
  if (!client) return backupSiteSettings;
  try {
    const data = await client.fetch<Partial<SiteSettingsData>>(
      `coalesce(
        *[_type == "siteSettings" && language == $lang][0],
        *[_type == "siteSettings" && (language == "en" || !defined(language))][0],
        *[_type == "siteSettings"][0]
      ) {
        ...,
        "defaultOgImageUrl": defaultOgImage.asset->url
      }`,
      { lang },
      getFetchOptions(['siteSettings', `siteSettings:${lang}`])
    );
    if (data && data.siteTitle) return { ...backupSiteSettings, ...data };
  } catch (err) {
    console.error('Error fetching siteSettings from Sanity:', err);
  }
  return backupSiteSettings;
}

export async function fetchHomePage(lang: string = 'en'): Promise<HomePageData> {
  const client = await getSanityClient();
  if (!client) return backupHomePage;
  try {
    const data = await client.fetch<Partial<HomePageData>>(
      `coalesce(
        *[_type == "homePage" && language == $lang][0],
        *[_type == "homePage" && (language == "en" || !defined(language))][0],
        *[_type == "homePage"][0]
      ) {
        ...,
        "ciccBadgeImageUrl": ciccBadgeImage.asset->url,
        "whoAreWeImageUrl": whoAreWeImage.asset->url,
        "aboutImageUrl": aboutImage.asset->url,
        "seo": seo {
          ...,
          "ogImageUrl": ogImage.asset->url
        }
      }`,
      { lang },
      getFetchOptions(['homePage', `homePage:${lang}`])
    );
    if (data && (data.heroTitle || data.strategyTitle || data.strategyEyebrow))
      return { ...backupHomePage, ...data };
  } catch (err) {
    console.error('Error fetching homePage from Sanity:', err);
  }
  return backupHomePage;
}

export async function fetchStaff(lang: string = 'en'): Promise<StaffData[]> {
  const client = await getSanityClient();
  if (!client) return backupStaff;
  try {
    let data = await client.fetch<StaffData[]>(
      `*[_type == "staffMember" && (language == $lang || (!defined(language) && $lang == "en"))] | order(order asc) {
        _id, name, designation, role, subtitle, bio, email, order,
        "photoUrl": photo.asset->url
      }`,
      { lang },
      getFetchOptions(['staffMember', `staffMember:${lang}`])
    );
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
  return backupStaff;
}

export async function fetchServices(lang: string = 'en'): Promise<ServiceData[]> {
  const client = await getSanityClient();
  if (!client) return backupServices;
  try {
    let data = await client.fetch<ServiceData[]>(
      `*[_type == "service" && (language == $lang || (!defined(language) && $lang == "en"))] | order(order asc) {
        _id, title, "slug": slug.current, order, iconName, summary, features, body,
        ctaTitle, ctaSubtitle, ctaButtonText, ctaButtonLink,
        "coverImageUrl": coverImage.asset->url,
        "seo": seo {
          ...,
          "ogImageUrl": ogImage.asset->url
        }
      }`,
      { lang },
      getFetchOptions(['services', `services:${lang}`])
    );
    if ((!data || data.length === 0) && lang !== 'en') {
      data = await client.fetch<ServiceData[]>(
        `*[_type == "service" && (language == "en" || !defined(language))] | order(order asc) {
          _id, title, "slug": slug.current, order, iconName, summary, features, body,
          ctaTitle, ctaSubtitle, ctaButtonText, ctaButtonLink,
          "coverImageUrl": coverImage.asset->url,
          "seo": seo {
            ...,
            "ogImageUrl": ogImage.asset->url
          }
        }`,
        {},
        getFetchOptions(['services', 'services:en'])
      );
    }
    if (data?.length) return data;
  } catch (err) {
    console.error('Error fetching services from Sanity:', err);
  }
  return backupServices;
}

export async function fetchServicesPage(lang: string = 'en'): Promise<ServicesPageData> {
  const client = await getSanityClient();
  if (!client) return backupServicesPage;
  try {
    const data = await client.fetch<ServicesPageData>(
      `coalesce(
        *[_type == "servicesPage" && language == $lang][0],
        *[_type == "servicesPage" && (language == "en" || !defined(language))][0],
        *[_type == "servicesPage" || _id == "servicesPage"][0]
      ) {
        ...,
        "seo": seo {
          ...,
          "ogImageUrl": ogImage.asset->url
        }
      }`,
      { lang },
      getFetchOptions(['servicesPage', `servicesPage:${lang}`])
    );
    if (data && data.titleMain) return data;
  } catch (err) {
    console.error('Error fetching services page header from Sanity:', err);
  }
  return backupServicesPage;
}

export async function fetchServiceBySlug(
  slug: string,
  lang: string = 'en',
  strict: boolean = false
): Promise<ServiceData | null> {
  const client = await getSanityClient();
  if (!client) return backupServices.find((s) => s.slug === slug) || backupServices[0];
  try {
    const query = strict
      ? `coalesce(
          *[_type == "service" && slug.current == $slug && (language == $lang || (!defined(language) && $lang == "en"))][0],
          *[_type == "translation.metadata" && count((translations[].value._ref)[@ in *[_type == "service" && slug.current == $slug]._id]) > 0][0].translations[language == $lang][0].value->
        ) {
          _id, title, "slug": slug.current, order, iconName, summary, features, body,
          ctaTitle, ctaSubtitle, ctaButtonText, ctaButtonLink,
          "coverImageUrl": coverImage.asset->url,
          "seo": seo {
            ...,
            "ogImageUrl": ogImage.asset->url
          }
        }`
      : `coalesce(
          *[_type == "service" && slug.current == $slug && language == $lang][0],
          *[_type == "service" && slug.current == $slug][0]
        ) {
          _id, title, "slug": slug.current, order, iconName, summary, features, body,
          ctaTitle, ctaSubtitle, ctaButtonText, ctaButtonLink,
          "coverImageUrl": coverImage.asset->url,
          "seo": seo {
            ...,
            "ogImageUrl": ogImage.asset->url
          }
        }`;
    const data = await client.fetch<ServiceData>(
      query,
      { slug, lang },
      getFetchOptions([`service:${slug}`, `service:${slug}:${lang}`])
    );
    if (data) return data;
  } catch (err) {
    console.error('Error fetching service by slug from Sanity:', err);
  }
  if (!strict) return backupServices.find((s) => s.slug === slug) || backupServices[0];
  return null;
}

export async function fetchTestimonials(lang: string = 'en'): Promise<TestimonialData[]> {
  const client = await getSanityClient();
  if (!client) return backupTestimonials;
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
  return backupTestimonials;
}

export async function fetchGoogleReviews(): Promise<GoogleReviewsData> {
  const client = await getSanityClient();
  if (!client) return backupGoogleReviews;
  try {
    const data = await client.fetch<GoogleReviewsData>(
      `*[_type == "googleReviews"][0] {
        _id,
        businessName,
        rating,
        totalReviews,
        googleMapsUrl,
        writeReviewUrl,
        lastSyncedAt,
        reviews
      }`,
      {},
      getFetchOptions(['googleReviews'])
    );
    if (data && data.reviews?.length) return { ...backupGoogleReviews, ...data };
  } catch (err) {
    console.error('Error fetching googleReviews from Sanity:', err);
  }
  return backupGoogleReviews;
}

export async function fetchInsightsPage(lang: string = 'en'): Promise<InsightsPageData> {
  const client = await getSanityClient();
  if (!client) return backupInsightsPage;
  try {
    const data = await client.fetch<Partial<InsightsPageData>>(
      `coalesce(
        *[_type == "insightsPage" && language == $lang][0],
        *[_type == "insightsPage" && (language == "en" || !defined(language))][0],
        *[_type == "insightsPage"][0]
      ) {
        ...,
        "seo": seo {
          ...,
          "ogImageUrl": ogImage.asset->url
        }
      }`,
      { lang },
      getFetchOptions(['insightsPage', `insightsPage:${lang}`])
    );
    if (data && (data.titleMain || data.eyebrow)) return { ...backupInsightsPage, ...data };
  } catch (err) {
    console.error('Error fetching insightsPage from Sanity:', err);
  }
  return backupInsightsPage;
}

export async function fetchPosts(
  kind?: PostKind | string,
  lang: string = 'en'
): Promise<PostData[]> {
  const client = await getSanityClient();
  if (!client) {
    if (!kind) return backupPosts;
    return backupPosts.filter((p) => p.kind === kind);
  }
  try {
    const query = kind
      ? `*[_type == "post" && (language == $lang || (!defined(language) && $lang == "en")) && kind == $kind] | order(publishedAt desc) {
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
          "seo": seo {
            ...,
            "ogImageUrl": ogImage.asset->url
          }
        }`
      : `*[_type == "post" && (language == $lang || (!defined(language) && $lang == "en"))] | order(publishedAt desc) {
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
          "seo": seo {
            ...,
            "ogImageUrl": ogImage.asset->url
          }
        }`;
    const tags = [
      'posts',
      `posts:${lang}`,
      ...(kind ? [`posts:${kind}`, `posts:${kind}:${lang}`] : []),
    ];
    let data = await client.fetch<PostData[]>(
      query,
      kind ? { kind, lang } : { lang },
      getFetchOptions(tags)
    );
    if ((!data || data.length === 0) && lang !== 'en') {
      const fallbackQuery = kind
        ? `*[_type == "post" && (language == "en" || !defined(language)) && kind == $kind] | order(publishedAt desc) {
            ...,
            "slug": slug.current,
            "coverImageUrl": coverImage.asset->url,
            "authorName": coalesce(customAuthorName, author->name, authorName, "Nazly Sunguroglu, RCIC"),
            "authorRole": coalesce(customAuthorRole, author->role, authorRole, "Regulated Canadian Immigration Consultant"),
            "authorPhotoUrl": author->photo.asset->url,
            "seo": seo {
              ...,
              "ogImageUrl": ogImage.asset->url
            }
          }`
        : `*[_type == "post" && (language == "en" || !defined(language))] | order(publishedAt desc) {
            ...,
            "slug": slug.current,
            "coverImageUrl": coverImage.asset->url,
            "authorName": coalesce(customAuthorName, author->name, authorName, "Nazly Sunguroglu, RCIC"),
            "authorRole": coalesce(customAuthorRole, author->role, authorRole, "Regulated Canadian Immigration Consultant"),
            "authorPhotoUrl": author->photo.asset->url,
            "seo": seo {
              ...,
              "ogImageUrl": ogImage.asset->url
            }
          }`;
      data = await client.fetch<PostData[]>(
        fallbackQuery,
        kind ? { kind } : {},
        getFetchOptions(['posts', 'posts:en'])
      );
    }
    if (data?.length) return data;
  } catch (err) {
    console.error('Error fetching posts from Sanity:', err);
  }
  if (!kind) return backupPosts;
  return backupPosts.filter((p) => p.kind === kind);
}

export async function fetchPostBySlug(
  slug: string,
  lang: string = 'en',
  strict: boolean = false
): Promise<PostData | null> {
  const client = await getSanityClient();
  if (!client) return backupPosts.find((p) => p.slug === slug) || null;
  try {
    const query = strict
      ? `coalesce(
          *[_type == "post" && slug.current == $slug && (language == $lang || (!defined(language) && $lang == "en"))][0],
          *[_type == "translation.metadata" && count((translations[].value._ref)[@ in *[_type == "post" && slug.current == $slug]._id]) > 0][0].translations[language == $lang][0].value->
        ) {
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
          "seo": seo {
            ...,
            "ogImageUrl": ogImage.asset->url
          }
        }`
      : `coalesce(
          *[_type == "post" && slug.current == $slug && language == $lang][0],
          *[_type == "post" && slug.current == $slug][0]
        ) {
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
          "seo": seo {
            ...,
            "ogImageUrl": ogImage.asset->url
          }
        }`;
    const data = await client.fetch<PostData>(
      query,
      { slug, lang },
      getFetchOptions([`post:${slug}`, `post:${slug}:${lang}`])
    );
    if (data) return data;
  } catch (err) {
    console.error('Error fetching post by slug from Sanity:', err);
  }
  if (!strict) return backupPosts.find((p) => p.slug === slug) || null;
  return null;
}

export async function fetchAllPostSlugsWithLang(
  kind?: PostKind | string
): Promise<{ lang: string; slug: string }[]> {
  const client = await getSanityClient();
  if (!client) {
    const list = kind ? backupPosts.filter((p) => p.kind === kind) : backupPosts;
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
    const data = await client.fetch<{ lang: string; slug: string }[]>(
      query,
      kind ? { kind } : {},
      getFetchOptions(['posts'])
    );
    if (data?.length) return data;
  } catch (err) {
    console.error('Error fetching post slugs with lang from Sanity:', err);
  }
  const list = kind ? backupPosts.filter((p) => p.kind === kind) : backupPosts;
  return list.map((p) => ({ lang: 'en', slug: p.slug }));
}

export async function fetchFaqPage(lang: string = 'en'): Promise<FaqPageData> {
  const client = await getSanityClient();
  if (!client) return backupFaqPage;
  try {
    const data = await client.fetch<Partial<FaqPageData>>(
      `coalesce(
        *[_type == "faqPage" && language == $lang][0],
        *[_type == "faqPage" && (language == "en" || !defined(language))][0],
        *[_type == "faqPage"][0]
      ) {
        ...,
        "seo": seo {
          ...,
          "ogImageUrl": ogImage.asset->url
        }
      }`,
      { lang },
      getFetchOptions(['faqPage', `faqPage:${lang}`])
    );
    if (data && (data.titleMain || data.eyebrow || data.items?.length)) {
      return { ...backupFaqPage, ...data };
    }
  } catch (err) {
    console.error('Error fetching faqPage from Sanity:', err);
  }
  return backupFaqPage;
}

export async function fetchPrivacyPage(lang: string = 'en'): Promise<PrivacyPageData> {
  const client = await getSanityClient();
  if (!client) return backupPrivacyPage;
  try {
    const data = await client.fetch<Partial<PrivacyPageData>>(
      `coalesce(
        *[_type == "privacyPage" && language == $lang][0],
        *[_type == "privacyPage" && (language == "en" || !defined(language))][0],
        *[_type == "privacyPage"][0]
      ) {
        ...,
        "seo": seo {
          ...,
          "ogImageUrl": ogImage.asset->url
        }
      }`,
      { lang },
      getFetchOptions(['privacyPage', `privacyPage:${lang}`])
    );
    if (data && (data.titleMain || data.eyebrow || data.commitmentTitle || data.content?.length)) {
      return { ...backupPrivacyPage, ...data };
    }
  } catch (err) {
    console.error('Error fetching privacyPage from Sanity:', err);
  }
  return backupPrivacyPage;
}

export * from './whatsapp';

