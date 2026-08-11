import { createClient } from '@sanity/client';
import {
  backupSiteSettings,
  backupHomePage,
  backupStaff,
  backupServices,
  backupTestimonials,
} from './backupData';

export interface SiteSettingsData {
  siteTitle: string;
  contactEmail: string;
  phone: string;
  officeHours: string;
  address: string;
  consultationLink: string;
  whatsappNumber: string;
  linkedinUrl: string;
  instagramUrl: string;
  headerNav: Array<{ label: string; href: string }>;
  footerNotice: string;
  copyrightText: string;
}

export interface ServiceData {
  _id: string;
  title: string;
  slug: string;
  order: number;
  iconName: string;
  summary: string;
  features: string[];
  coverImageUrl?: string;
}

export interface TestimonialData {
  _id: string;
  author: string;
  location: string;
  quote: string;
  rating: number;
}

export interface StaffData {
  _id: string;
  name: string;
  designation: string;
  role: string;
  subtitle: string;
  photoUrl?: string;
  bio: string;
  email?: string;
  order: number;
}

export interface HomePageData {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCtaText: string;
  heroPrimaryCtaLink: string;
  heroSecondaryCtaText: string;
  badgeText: string;
  stats: Array<{ number: string; label: string }>;
  strategyEyebrow: string;
  strategyTitle: string;
  strategyParagraph1: string;
  strategyParagraph2: string;
  calloutEyebrow: string;
  calloutTitle: string;
  calloutCtaText: string;
}

export const defaultSiteSettings = backupSiteSettings;
export const defaultHomePage = backupHomePage;
export const defaultServices = backupServices;
export const defaultStaff = backupStaff;
export const defaultTestimonials = backupTestimonials;

export function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
  if (!projectId) return null;

  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
  return createClient({
    projectId,
    dataset,
    apiVersion: '2026-07-14',
    useCdn: false,
  });
}

export async function fetchSiteSettings(): Promise<SiteSettingsData> {
  const client = getSanityClient();
  if (!client) return backupSiteSettings;
  try {
    const data = await client.fetch<Partial<SiteSettingsData>>(
      `*[_type == "siteSettings" && _id == "siteSettings"][0]`
    );
    if (data && data.siteTitle) return { ...backupSiteSettings, ...data };
  } catch (err) {
    console.error('Error fetching siteSettings from Sanity:', err);
  }
  return backupSiteSettings;
}

export async function fetchHomePage(): Promise<HomePageData> {
  const client = getSanityClient();
  if (!client) return backupHomePage;
  try {
    const data = await client.fetch<Partial<HomePageData>>(
      `*[_type == "homePage" && _id == "homePage"][0]`
    );
    if (data && data.heroTitle) return { ...backupHomePage, ...data };
  } catch (err) {
    console.error('Error fetching homePage from Sanity:', err);
  }
  return backupHomePage;
}

export async function fetchStaff(): Promise<StaffData[]> {
  const client = getSanityClient();
  if (!client) return backupStaff;
  try {
    const data = await client.fetch<StaffData[]>(
      `*[_type == "staffMember"] | order(order asc) {
        _id, name, designation, role, subtitle, bio, email, order,
        "photoUrl": photo.asset->url
      }`
    );
    if (data?.length) return data;
  } catch (err) {
    console.error('Error fetching staffMember from Sanity:', err);
  }
  return backupStaff;
}

export async function fetchServices(): Promise<ServiceData[]> {
  const client = getSanityClient();
  if (!client) return backupServices;
  try {
    const data = await client.fetch<ServiceData[]>(
      `*[_type == "service"] | order(order asc) {
        _id, title, "slug": slug.current, order, iconName, summary, features,
        "coverImageUrl": coverImage.asset->url
      }`
    );
    if (data?.length) return data;
  } catch (err) {
    console.error('Error fetching services from Sanity:', err);
  }
  return backupServices;
}

export async function fetchServiceBySlug(slug: string): Promise<ServiceData | null> {
  const client = getSanityClient();
  if (!client) return backupServices.find((s) => s.slug === slug) || backupServices[0];
  try {
    const data = await client.fetch<ServiceData>(
      `*[_type == "service" && slug.current == $slug][0] {
        _id, title, "slug": slug.current, order, iconName, summary, features,
        "coverImageUrl": coverImage.asset->url
      }`,
      { slug }
    );
    if (data) return data;
  } catch (err) {
    console.error('Error fetching service by slug from Sanity:', err);
  }
  return backupServices.find((s) => s.slug === slug) || backupServices[0];
}

export async function fetchTestimonials(): Promise<TestimonialData[]> {
  const client = getSanityClient();
  if (!client) return backupTestimonials;
  try {
    const data = await client.fetch<TestimonialData[]>(
      `*[_type == "testimonial"] | order(order asc) { _id, author, location, quote, rating }`
    );
    if (data?.length) return data;
  } catch (err) {
    console.error('Error fetching testimonials from Sanity:', err);
  }
  return backupTestimonials;
}
