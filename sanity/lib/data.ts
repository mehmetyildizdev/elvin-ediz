import { createClient } from 'next-sanity';
import { draftMode } from 'next/headers';
import {
  backupSiteSettings,
  backupHomePage,
  backupStaff,
  backupServices,
  backupTestimonials,
} from './backupData';
import type {
  SiteSettingsData,
  HomePageData,
  ServiceData,
  StaffData,
  TestimonialData,
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
      `*[_type == "homePage"][0]`,
      {},
      fetchOptions
    );
    if (data && data.heroTitle) return { ...backupHomePage, ...data };
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
