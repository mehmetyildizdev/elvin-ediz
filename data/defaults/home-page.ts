import type { HomePageData } from '@/sanity/lib/types';

export const backupHomePage: HomePageData = {
  // 00. Hero
  heroEyebrow: 'ELVIN EDIZ IMMIGRATION SERVICES',
  heroTitle: 'Your Canadian story. starts here.',
  heroSubtitle:
    'Clear, compassionate, and regulated Canadian immigration guidance tailored to the life you are ready to build in Canada.',
  heroPrimaryCtaText: 'Free Consultation',
  heroPrimaryCtaLink: 'https://wa.me/123456789',
  heroSecondaryCtaText: 'Explore services',
  heroSecondaryCtaLink: '#services',
  badgeText: 'EST. 2018',

  // 01. Trust Bar
  trustBarItems: [
    { number: '01', text: 'CICC Regulated Consultant', icon: 'shield' },
    { number: '02', text: 'Personalized Guidance', icon: 'user-check' },
    { number: '03', text: 'Clear Next Steps', icon: 'check' },
    { number: '04', text: 'Canada-Wide Service', icon: 'map-pin' },
  ],

  // 02. Services
  servicesEyebrow: 'IMMIGRATION PATHWAYS',
  servicesTitleMain: 'Choose your',
  servicesTitleAccent: 'immigration plan.',
  servicesDescription:
    'We personalize your immigration plan to suit your needs and goals. Your pathway to Canada is divided into distinct, clear categories.',
  servicesViewAllText: 'View all 5 pathways →',
  servicesViewAllLink: '/services',
  servicesCardCtaText: 'Learn more',

  // 03. Who Are We / RCIC Section
  strategyEyebrow: 'WHO ARE WE?',
  strategyTitle: 'Elvin Ediz Immigration Services',
  strategyParagraph1:
    'Elvin Ediz Immigration Services is a Toronto-based Canadian immigration firm led by Nazly Sunguroglu, RCIC (Regulated Canadian Immigration Consultant). We provide structured, end-to-end guidance across economic immigration, study pathways, work permits, family sponsorship, and citizenship.',
  strategyParagraph2:
    'Every profile is assessed with direct oversight from an RCIC, ensuring your submission meets current IRCC criteria and minimizes avoidable processing delays.',
  whoAreWePrimaryCtaText: 'Free Consultation',
  whoAreWePrimaryCtaLink: 'https://wa.me/123456789',
  whoAreWeSecondaryCtaText: 'Send a Message',
  whoAreWeSecondaryCtaLink: '#contact',
  ciccBadgeImageUrl: '/rcic_logo.png',
  ciccBadgeTitle: 'CICC REGISTERED & APPROVED',
  ciccBadgeSubtitle:
    'Regulated Canadian Immigration Consultant (RCIC)\nMember of the College of Immigration and Citizenship Consultants.',
  stats: [
    { number: '4,578+', label: 'Trusted Clients', icon: 'user-check' },
    { number: '99%', label: 'Worldwide Approvals', icon: 'globe' },
    { number: '50+', label: 'Canadian Colleges', icon: 'school' },
    { number: '120+', label: 'Successful PR Visas', icon: 'graduation' },
    { number: '100%', label: 'Regulated RCIC Support', icon: 'file-check' },
  ],

  // 04. Our Strategy / About Section
  aboutEyebrow: 'ELVIN EDIZ IMMIGRATION SERVICES',
  aboutTitleMain: 'Our',
  aboutTitleAccent: 'Strategy',
  aboutQuoteParagraph: 'We believe Canadian immigration should be empowering, not overwhelming.',
  aboutBodyParagraph:
    'With personalized assessment and clear strategic direction, we help individuals, students, professionals, and families navigate Canadian immigration regulations with confidence.',
  aboutCtaText: 'Free Consultation',
  aboutCtaLink: 'https://wa.me/123456789',

  // 05. Testimonials
  testimonialsEyebrow: 'CLIENT EXPERIENCES',
  testimonialsTitleMain: 'Trusted by clients',
  testimonialsTitleAccent: 'across the globe.',
  testimonialsGoogleBasedOnText: 'Based on',
  testimonialsGoogleReviewsCountText: 'reviews on Google',
  testimonialsGoogleViewButtonText: 'View on Google',
  testimonialsGoogleReviewButtonText: 'Review Us',
  testimonialsGoogleReadMoreText: 'Read on Google Maps',
  testimonialsGoogleVerifiedText: 'Verified Google Review',
  testimonialsCuratedTitle: 'Additional Client Cases & Feedback',
  testimonialsCuratedSubtitle: 'Direct client submissions',
  testimonialsCuratedBadgeText: 'Client Case',

  // 06. Process (How It Works)
  processEyebrow: 'THE ELVIN EDIZ WAY',
  processTitleMain: 'Less uncertainty.',
  processTitleAccent: 'More momentum.',
  processSteps: [
    {
      number: '01',
      title: 'Start with a conversation',
      text: 'We listen to your plans, questions, and circumstances.',
    },
    {
      number: '02',
      title: 'Find your right pathway',
      text: 'Together, we map out an approach that makes sense for you.',
    },
    {
      number: '03',
      title: 'Move forward with confidence',
      text: 'We help you prepare, submit, and understand what comes next.',
    },
  ],

  // 07. Insights
  insightsEyebrow: 'THE LATEST',
  insightsTitleMain: 'Fresh',
  insightsTitleAccent: 'perspective.',
  insightsViewAllText: 'View all insights',
  insightsViewAllLink: '/insights',
  insightsReadMoreText: 'Read more',

  // 08. Contact
  contactEyebrow: 'READY WHEN YOU ARE',
  contactTitleMain: "Let's talk about\nwhat's",
  contactTitleAccent: 'next.',
  contactDescription:
    'Whether you have a clear plan or are just beginning to explore, reaching out for a free consultation is a good place to start.',
  contactNameLabel: 'Your name',
  contactNamePlaceholder: 'How should we call you?',
  contactEmailLabel: 'Email address',
  contactEmailPlaceholder: 'you@example.com',
  contactPhoneLabel: 'Phone number',
  contactPhonePlaceholder: 'Your preferred number',
  contactOptionalText: '(optional)',
  contactServiceLabel: 'What can we help with?',
  contactServicePlaceholder: 'Select a service',
  contactMessageLabel: 'Tell us a little more',
  contactMessagePlaceholder: 'What would you like help with?',
  contactSubmitButtonText: 'Free Consultation Request',
  contactSubmittingText: 'Sending…',
  contactSuccessMessage: "Thank you — we'll be in touch soon.",
  contactErrorMessage: 'Something went wrong. Please email us directly.',
  contactDisclaimer: 'By submitting, you agree to be contacted by Elvin Ediz Immigration Services.',
  contactServiceOptions: [
    'Study in Canada',
    'Work & Careers',
    'Family Sponsorship',
    'Permanent Residence',
    'Other',
  ],
};

export const defaultHomePage = backupHomePage;
