import { createClient } from 'next-sanity';
import { draftMode } from 'next/headers';
import {
  backupSiteSettings,
  backupHomePage,
  backupStaff,
  backupServices,
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
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
  if (!projectId) return null;

  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
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
      studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333',
    },
    token: isDraft ? (process.env.SANITY_EDITOR_TOKEN || process.env.SANITY_API_READ_TOKEN) : undefined,
  });
}

const fetchOptions = { next: { revalidate: 0 } };

export async function fetchSiteSettings(): Promise<SiteSettingsData> {
  const client = await getSanityClient();
  if (!client) return backupSiteSettings;
  try {
    const data = await client.fetch<Partial<SiteSettingsData>>(
      `*[_type == "siteSettings"][0]`,
      {},
      fetchOptions
    );
    if (data && data.siteTitle) return { ...backupSiteSettings, ...data };
  } catch (err) {
    console.error('Error fetching siteSettings from Sanity:', err);
  }
  return backupSiteSettings;
}

export async function fetchHomePage(): Promise<HomePageData> {
  const client = await getSanityClient();
  if (!client) return backupHomePage;
  try {
    const data = await client.fetch<Partial<HomePageData>>(
      `*[_type == "homePage"][0] {
        ...,
        "ciccBadgeImageUrl": ciccBadgeImage.asset->url,
        "whoAreWeImageUrl": whoAreWeImage.asset->url,
        "aboutImageUrl": aboutImage.asset->url
      }`,
      {},
      fetchOptions
    );
    if (data && (data.heroTitle || data.strategyTitle || data.strategyEyebrow)) return { ...backupHomePage, ...data };
  } catch (err) {
    console.error('Error fetching homePage from Sanity:', err);
  }
  return backupHomePage;
}

export async function fetchStaff(): Promise<StaffData[]> {
  const client = await getSanityClient();
  if (!client) return backupStaff;
  try {
    const data = await client.fetch<StaffData[]>(
      `*[_type == "staffMember"] | order(order asc) {
        _id, name, designation, role, subtitle, bio, email, order,
        "photoUrl": photo.asset->url
      }`,
      {},
      fetchOptions
    );
    if (data?.length) return data;
  } catch (err) {
    console.error('Error fetching staffMember from Sanity:', err);
  }
  return backupStaff;
}

export async function fetchServices(): Promise<ServiceData[]> {
  const client = await getSanityClient();
  if (!client) return backupServices;
  try {
    const data = await client.fetch<ServiceData[]>(
      `*[_type == "service"] | order(order asc) {
        _id, title, "slug": slug.current, order, iconName, summary, features, body,
        ctaTitle, ctaSubtitle, ctaButtonText, ctaButtonLink,
        "coverImageUrl": coverImage.asset->url
      }`,
      {},
      fetchOptions
    );
    if (data?.length) return data;
  } catch (err) {
    console.error('Error fetching services from Sanity:', err);
  }
  return backupServices;
}

export async function fetchServiceBySlug(slug: string): Promise<ServiceData | null> {
  const client = await getSanityClient();
  if (!client) return backupServices.find((s) => s.slug === slug) || backupServices[0];
  try {
    const data = await client.fetch<ServiceData>(
      `*[_type == "service" && slug.current == $slug][0] {
        _id, title, "slug": slug.current, order, iconName, summary, features, body,
        ctaTitle, ctaSubtitle, ctaButtonText, ctaButtonLink,
        "coverImageUrl": coverImage.asset->url
      }`,
      { slug },
      fetchOptions
    );
    if (data) return data;
  } catch (err) {
    console.error('Error fetching service by slug from Sanity:', err);
  }
  return backupServices.find((s) => s.slug === slug) || backupServices[0];
}

export async function fetchTestimonials(): Promise<TestimonialData[]> {
  const client = await getSanityClient();
  if (!client) return backupTestimonials;
  try {
    const data = await client.fetch<TestimonialData[]>(
      `*[_type == "testimonial"] | order(order asc) { _id, author, location, quote, rating }`,
      {},
      fetchOptions
    );
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
      fetchOptions
    );
    if (data && data.reviews?.length) return { ...backupGoogleReviews, ...data };
  } catch (err) {
    console.error('Error fetching googleReviews from Sanity:', err);
  }
  return backupGoogleReviews;
}

export async function fetchInsightsPage(): Promise<InsightsPageData> {
  const client = await getSanityClient();
  if (!client) return backupInsightsPage;
  try {
    const data = await client.fetch<Partial<InsightsPageData>>(
      `*[_type == "insightsPage"][0]`,
      {},
      fetchOptions
    );
    if (data && (data.titleMain || data.eyebrow)) return { ...backupInsightsPage, ...data };
  } catch (err) {
    console.error('Error fetching insightsPage from Sanity:', err);
  }
  return backupInsightsPage;
}

export async function fetchPosts(kind?: PostKind | string): Promise<PostData[]> {
  const client = await getSanityClient();
  if (!client) {
    if (!kind) return backupPosts;
    return backupPosts.filter((p) => p.kind === kind);
  }
  try {
    const query = kind
      ? `*[_type == "post" && kind == $kind] | order(publishedAt desc) {
          ...,
          "slug": slug.current,
          "coverImageUrl": coverImage.asset->url,
          "authorName": coalesce(customAuthorName, author->name, authorName, "Nazly Sunguroglu, RCIC"),
          "authorRole": coalesce(customAuthorRole, author->role, authorRole, "Regulated Canadian Immigration Consultant"),
          "authorPhotoUrl": author->photo.asset->url
        }`
      : `*[_type == "post"] | order(publishedAt desc) {
          ...,
          "slug": slug.current,
          "coverImageUrl": coverImage.asset->url,
          "authorName": coalesce(customAuthorName, author->name, authorName, "Nazly Sunguroglu, RCIC"),
          "authorRole": coalesce(customAuthorRole, author->role, authorRole, "Regulated Canadian Immigration Consultant"),
          "authorPhotoUrl": author->photo.asset->url
        }`;
    const data = await client.fetch<PostData[]>(
      query,
      kind ? { kind } : {},
      fetchOptions
    );
    if (data?.length) return data;
  } catch (err) {
    console.error('Error fetching posts from Sanity:', err);
  }
  if (!kind) return backupPosts;
  return backupPosts.filter((p) => p.kind === kind);
}

export async function fetchPostBySlug(slug: string): Promise<PostData | null> {
  const client = await getSanityClient();
  if (!client) return backupPosts.find((p) => p.slug === slug) || null;
  try {
    const data = await client.fetch<PostData>(
      `*[_type == "post" && slug.current == $slug][0] {
        ...,
        "slug": slug.current,
        "coverImageUrl": coverImage.asset->url,
        "authorName": coalesce(customAuthorName, author->name, authorName, "Nazly Sunguroglu, RCIC"),
        "authorRole": coalesce(customAuthorRole, author->role, authorRole, "Regulated Canadian Immigration Consultant"),
        "authorPhotoUrl": author->photo.asset->url
      }`,
      { slug },
      fetchOptions
    );
    if (data) return data;
  } catch (err) {
    console.error('Error fetching post by slug from Sanity:', err);
  }
  return backupPosts.find((p) => p.slug === slug) || null;
}

export async function fetchFaqPage(): Promise<FaqPageData> {
  const client = await getSanityClient();
  if (!client) return backupFaqPage;
  try {
    const data = await client.fetch<Partial<FaqPageData>>(
      `*[_type == "faqPage"][0]`,
      {},
      fetchOptions
    );
    if (data && (data.titleMain || data.eyebrow || data.items?.length)) {
      return { ...backupFaqPage, ...data };
    }
  } catch (err) {
    console.error('Error fetching faqPage from Sanity:', err);
  }
  return backupFaqPage;
}

export async function fetchPrivacyPage(): Promise<PrivacyPageData> {
  const client = await getSanityClient();
  if (!client) return backupPrivacyPage;
  try {
    const data = await client.fetch<Partial<PrivacyPageData>>(
      `*[_type == "privacyPage"][0]`,
      {},
      fetchOptions
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

