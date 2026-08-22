export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: any;
  ogImageUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  structuredDataType?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

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
  footerDescription?: string;
  footerNavTitle?: string;
  footerNav?: Array<{ label: string; href: string }>;
  footerConnectTitle?: string;
  footerConsultationText?: string;
  footerPrivacyText?: string;
  footerNotice: string;
  copyrightText: string;
  showDeveloperCredit?: boolean;
  developerCreditText?: string;
  developerCreditName?: string;
  developerCreditUrl?: string;
  defaultMetaTitle?: string;
  titleTemplate?: string;
  defaultMetaDescription?: string;
  defaultOgImage?: any;
  defaultOgImageUrl?: string;
  siteKeywords?: string[];
  googleSiteVerification?: string;
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
  seo?: SeoData;
}

export interface TestimonialData {
  _id: string;
  author: string;
  location: string;
  quote: string;
  rating: number;
}

export interface GoogleReviewItem {
  _key?: string;
  author: string;
  avatarUrl?: string;
  rating: number;
  date?: string;
  quote?: string;
  highlight?: boolean;
}

export interface GoogleReviewsData {
  _id?: string;
  businessName: string;
  rating: number;
  totalReviews: number;
  googleMapsUrl?: string;
  writeReviewUrl?: string;
  lastSyncedAt?: string;
  reviews: GoogleReviewItem[];
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
  servicesCardCtaText?: string;

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
  testimonialsGoogleBasedOnText?: string;
  testimonialsGoogleReviewsCountText?: string;
  testimonialsGoogleViewButtonText?: string;
  testimonialsGoogleReviewButtonText?: string;
  testimonialsGoogleReadMoreText?: string;
  testimonialsGoogleVerifiedText?: string;
  testimonialsCuratedTitle?: string;
  testimonialsCuratedSubtitle?: string;
  testimonialsCuratedBadgeText?: string;

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
  insightsReadMoreText?: string;

  // 08. Contact Section
  contactEyebrow?: string;
  contactTitleMain?: string;
  contactTitleAccent?: string;
  contactDescription?: string;
  contactNameLabel?: string;
  contactNamePlaceholder?: string;
  contactEmailLabel?: string;
  contactEmailPlaceholder?: string;
  contactPhoneLabel?: string;
  contactPhonePlaceholder?: string;
  contactOptionalText?: string;
  contactServiceLabel?: string;
  contactServicePlaceholder?: string;
  contactMessageLabel?: string;
  contactMessagePlaceholder?: string;
  contactSubmitButtonText?: string;
  contactSubmittingText?: string;
  contactSuccessMessage?: string;
  contactErrorMessage?: string;
  contactDisclaimer?: string;
  contactServiceOptions?: string[];
  seo?: SeoData;
}

export type PostKind = 'insight' | 'news' | 'announcement' | 'information';

export interface PostData {
  _id: string;
  title: string;
  slug: string;
  language?: string;
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

  seo?: SeoData;
}

export interface InsightsPageData {
  // 01. Page Header
  eyebrow: string;
  titleMain: string;
  titleAccent: string;
  description: string;

  // 02. Category Navigation Bar & Pagination
  categoryNavLabel?: string;
  categoryInsightsLabel?: string;
  categoryGuidesLabel?: string;
  categoryAnnouncementsLabel?: string;
  categoryNewsLabel?: string;
  categoryQaPrompt?: string;
  sectionDividerBadgeText?: string;
  paginationPrevText?: string;
  paginationNextText?: string;
  breadcrumbBackToHubText?: string;

  // 03. Insights Section
  insightsEyebrow: string;
  insightsTitleMain: string;
  insightsTitleAccent: string;
  insightsDescription: string;
  insightsReadArticleText?: string;
  insightsEmptyMessage?: string;

  // 04. Information Guides Section
  infoEyebrow: string;
  infoTitleMain: string;
  infoTitleAccent: string;
  infoDescription: string;
  infoViewAllText?: string;
  infoBadgeText?: string;
  infoCuratedByText?: string;
  infoExploreGuideText?: string;
  infoChecklistStepText?: string;
  infoChecklistStepsText?: string;
  infoChecklistKeyItemsTitle?: string;
  infoViewFullGuideActionText?: string;
  infoConsultantActionText?: string;
  infoMorePointsText?: string;
  infoEmptyMessage?: string;

  // 05. Announcements Section
  announcementsEyebrow: string;
  announcementsTitle: string;
  announcementsEmptyMessage: string;
  announcementsViewAllText?: string;
  announcementsBadgeText?: string;
  announcementsEffectivePrefix?: string;
  announcementsActionTitle?: string;
  announcementsViewActionText?: string;
  announcementsViewFullActionText?: string;
  announcementsInquireActionText?: string;

  // 06. News Section
  newsEyebrow: string;
  newsTitle: string;
  newsEmptyMessage: string;
  newsViewAllText?: string;
  newsFeaturedBadgeText?: string;
  newsReadStoryText?: string;
  newsReadActionText?: string;
  newsSourceLabel?: string;

  // 07. Sidebar Consultation Card
  consultationEyebrow: string;
  consultationTitle: string;
  consultationDescription: string;
  consultationButtonText: string;
  consultationButtonLink: string;

  seo?: SeoData;
}

export interface FaqItem {
  _key?: string;
  question: string;
  category?: string;
  answer: any[] | string;
}

export interface ServicesPageData {
  _id?: string;
  eyebrow: string;
  titleMain: string;
  titleAccent: string;
  description: string;

  // 02. Pathways Layout & Labels
  pathwayNavTitle?: string;
  pathwayNumberPrefix?: string;
  rcicAssessedBadgeText?: string;
  pathwaySummaryTitle?: string;
  featuresSectionTitle?: string;
  detailedOverviewTitle?: string;

  // 03. Consultation Callout
  calloutEyebrow?: string;
  calloutTitleMain?: string;
  calloutTitleAccent?: string;
  calloutButtonText?: string;

  seo?: SeoData;
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

  seo?: SeoData;
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

  seo?: SeoData;
}

export interface AboutPageData {
  _id?: string;
  language?: string;

  // 01. Page Header
  eyebrow?: string;
  titleMain?: string;
  titleAccent?: string;
  description?: string;

  // 02. Who We Are
  whoAreWeEyebrow?: string;
  whoAreWeTitle?: string;
  whoAreWeParagraph1?: string;
  whoAreWeParagraph2?: string;
  whoAreWePrimaryCtaText?: string;
  whoAreWePrimaryCtaLink?: string;
  whoAreWeSecondaryCtaText?: string;
  whoAreWeSecondaryCtaLink?: string;
  ciccBadgeImageUrl?: string;
  ciccBadgeTitle?: string;
  ciccBadgeSubtitle?: string;
  stats?: StatItem[];

  // 03. Strategy & Leadership
  strategyEyebrow?: string;
  strategyTitleMain?: string;
  strategyTitleAccent?: string;
  strategyImageUrl?: string;
  strategyLeaderName?: string;
  strategyLeaderRole?: string;
  strategyLeaderSubtitle?: string;
  strategyQuoteParagraph?: string;
  strategyBodyParagraph?: string;
  credentials?: string[];
  strategyCtaText?: string;
  strategyCtaLink?: string;

  // 04. Process (How It Works)
  processEyebrow?: string;
  processTitleMain?: string;
  processTitleAccent?: string;
  processSteps?: ProcessStep[];

  // 05. Consultation Callout
  ctaEyebrow?: string;
  ctaTitleMain?: string;
  ctaTitleAccent?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;

  seo?: SeoData;
}

// Re-export all type-safe defaults from data layer
export * from '@/data/defaults';
