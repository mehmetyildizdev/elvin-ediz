import {
  backupSiteSettings,
  backupHomePage,
  backupStaff,
  backupServices,
  backupTestimonials,
  backupInsightsPage,
  backupPosts,
  backupFaqPage,
  backupPrivacyPage,
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
  ciccBadgeImage?: any;
  ciccBadgeImageUrl?: string;
  whoAreWeImageUrl?: string;
  ciccBadgeTitle?: string;
  ciccBadgeSubtitle?: string;
  stats?: StatItem[];

  // 04. Our Strategy / About Section
  aboutEyebrow?: string;
  aboutTitleMain?: string;
  aboutTitleAccent?: string;
  aboutImage?: any;
  aboutImageUrl?: string;
  aboutLeaderName?: string;
  aboutLeaderRole?: string;
  aboutLeaderSubtitle?: string;
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

export type PostKind = 'insight' | 'news' | 'announcement' | 'information';

export interface PostData {
  _id: string;
  title: string;
  slug: string;
  kind: PostKind;
  excerpt?: string;
  coverImageUrl?: string;
  iconName?: string;
  content?: any[];
  publishedAt?: string;
  author?: {
    _ref: string;
    _type: 'reference';
  };
  authorName?: string;
  authorRole?: string;
  authorPhotoUrl?: string;
  customAuthorName?: string;
  customAuthorRole?: string;

  // Insight specific section
  authorOversightIcon?: string;
  authorOversightTitle?: string;
  authorOversightSubtitle?: string;
  authorOversightText?: string;
  authorOversightCtaText?: string;
  authorOversightCtaLink?: string;

  // Information specific section
  checklistIcon?: string;
  checklistTitle?: string;
  checklistDescription?: string;
  checklistItems?: string[];
  infoCtaTitle?: string;
  infoCtaSubtitle?: string;
  infoCtaButtonText?: string;
  infoCtaButtonLink?: string;

  // Announcement specific section
  effectiveDate?: string;
  announcementNoticeIcon?: string;
  announcementNoticeEyebrow?: string;
  announcementNoticeTitle?: string;
  announcementActionTitle?: string;
  announcementActionText?: string;
  announcementCtaButtonText?: string;
  announcementCtaButtonLink?: string;

  // News specific section
  category?: string;
  sourceName?: string;
  sourceURL?: string;
  readTime?: string;
  editorialNote?: string;
  newsHighlights?: string[];
  newsImpactTitle?: string;
  newsImpactText?: string;
  newsCtaButtonText?: string;
  newsCtaButtonLink?: string;
}

export interface InsightsPageData {
  // 01. Page Header
  eyebrow: string;
  titleMain: string;
  titleAccent: string;
  description: string;

  // 02. Insights Section
  insightsEyebrow: string;
  insightsTitleMain: string;
  insightsTitleAccent: string;
  insightsDescription: string;

  // 03. Information Guides Section
  infoEyebrow: string;
  infoTitleMain: string;
  infoTitleAccent: string;
  infoDescription: string;

  // 04. Announcements Section
  announcementsEyebrow: string;
  announcementsTitle: string;
  announcementsEmptyMessage: string;

  // 05. News Section
  newsEyebrow: string;
  newsTitle: string;
  newsEmptyMessage: string;

  // 06. Sidebar Consultation Card
  consultationEyebrow: string;
  consultationTitle: string;
  consultationDescription: string;
  consultationButtonText: string;
  consultationButtonLink: string;
}

export interface FaqItem {
  _key?: string;
  question: string;
  category?: string;
  answer: any[] | string;
}

export interface FaqPageData {
  // 01. Page Header
  eyebrow?: string;
  titleMain?: string;
  titleAccent?: string;
  description?: string;

  // 02. FAQ Items
  items?: FaqItem[];

  // 03. Consultation Callout
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
}

export interface PrivacyPageData {
  // 01. Page Header
  eyebrow?: string;
  titleMain?: string;
  titleAccent?: string;
  description?: string;

  // 02. Commitment Box
  commitmentTitle?: string;
  commitmentText?: string;

  // 03. Content
  content?: any[];

  // 04. Inquiries Box
  inquiryTitle?: string;
  inquiryDescription?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export const defaultSiteSettings = backupSiteSettings;
export const defaultHomePage = backupHomePage;
export const defaultServices = backupServices;
export const defaultStaff = backupStaff;
export const defaultTestimonials = backupTestimonials;
export const defaultInsightsPage = backupInsightsPage;
export const defaultPosts = backupPosts;
export const defaultFaqPage: FaqPageData = backupFaqPage;
export const defaultPrivacyPage: PrivacyPageData = backupPrivacyPage;


