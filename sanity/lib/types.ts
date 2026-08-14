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
  body?: any[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
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

export interface StatItem {
  number: string;
  label: string;
  icon?: string;
}

export interface TrustItem {
  _key?: string;
  number?: string;
  text: string;
  icon?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  text: string;
}

export interface HomePageData {
  // 00. Hero
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCtaText: string;
  heroPrimaryCtaLink: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink?: string;
  badgeText: string;

  // 01. Trust Bar
  trustBarItems?: TrustItem[];

  // 02. Services Section
  servicesEyebrow?: string;
  servicesTitleMain?: string;
  servicesTitleAccent?: string;
  servicesDescription?: string;
  servicesViewAllText?: string;
  servicesViewAllLink?: string;

  // 03. Who Are We / RCIC Section
  strategyEyebrow?: string;
  strategyTitle?: string;
  strategyParagraph1?: string;
  strategyParagraph2?: string;
  whoAreWePrimaryCtaText?: string;
  whoAreWePrimaryCtaLink?: string;
  whoAreWeSecondaryCtaText?: string;
  whoAreWeSecondaryCtaLink?: string;
  ciccBadgeTitle?: string;
  ciccBadgeSubtitle?: string;
  stats?: StatItem[];

  // 04. Our Strategy / About Section
  aboutEyebrow?: string;
  aboutTitleMain?: string;
  aboutTitleAccent?: string;
  aboutQuoteParagraph?: string;
  aboutBodyParagraph?: string;
  aboutCtaText?: string;
  aboutCtaLink?: string;

  // 05. Testimonials Section
  testimonialsEyebrow?: string;
  testimonialsTitleMain?: string;
  testimonialsTitleAccent?: string;

  // 06. Process (How It Works)
  processEyebrow?: string;
  processTitleMain?: string;
  processTitleAccent?: string;
  processSteps?: ProcessStep[];

  // 07. Insights Section
  insightsEyebrow?: string;
  insightsTitleMain?: string;
  insightsTitleAccent?: string;
  insightsViewAllText?: string;
  insightsViewAllLink?: string;

  // 08. Contact Section
  contactEyebrow?: string;
  contactTitleMain?: string;
  contactTitleAccent?: string;
  contactDescription?: string;
  contactSubmitButtonText?: string;
  contactDisclaimer?: string;
  contactServiceOptions?: string[];
}

export const defaultSiteSettings = backupSiteSettings;
export const defaultHomePage = backupHomePage;
export const defaultServices = backupServices;
export const defaultStaff = backupStaff;
export const defaultTestimonials = backupTestimonials;
