import type {
  SiteSettingsData,
  HomePageData,
  StaffData,
  ServiceData,
  TestimonialData,
  InsightsPageData,
  PostData,
} from './types';

export const backupSiteSettings: SiteSettingsData = {
  siteTitle: 'Elvin Ediz Immigration Services',
  contactEmail: 'info@elvinediz.com',
  phone: '(647) 568 1009',
  officeHours: 'Mon - Fri: 09:00am - 4:00pm',
  address: 'Toronto, Ontario, Canada',
  consultationLink: 'https://wa.me/16475681009',
  whatsappNumber: 'https://wa.me/16475681009',
  linkedinUrl: 'https://www.linkedin.com/in/nazly-sunguroglu-31574455/',
  instagramUrl: 'https://www.instagram.com/elvinedizimmigration/',
  headerNav: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Insights', href: '/insights' },
    { label: 'Q&A', href: '/questions' },
    { label: 'Contact', href: '/contact' },
  ],
  footerNotice: 'Regulated Canadian Immigration Consultant (RCIC)',
  copyrightText: `© ${new Date().getFullYear()} Elvin Ediz Immigration Services. All rights reserved.`,
};

export const backupHomePage: HomePageData = {
  // 00. Hero
  heroEyebrow: 'ELVIN EDIZ IMMIGRATION SERVICES',
  heroTitle: 'Your Canadian story. starts here.',
  heroSubtitle:
    'Clear, compassionate, and regulated Canadian immigration guidance tailored to the life you are ready to build in Canada.',
  heroPrimaryCtaText: 'Free Consultation',
  heroPrimaryCtaLink: 'https://wa.me/16475681009',
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

  // 03. Who Are We / RCIC Section
  strategyEyebrow: 'WHO ARE WE?',
  strategyTitle: 'Elvin Ediz Immigration Services',
  strategyParagraph1:
    'Elvin Ediz Immigration Services is a Toronto-based Canadian immigration firm led by Nazly Sunguroglu, RCIC (Regulated Canadian Immigration Consultant). We provide structured, end-to-end guidance across economic immigration, study pathways, work permits, family sponsorship, and citizenship.',
  strategyParagraph2:
    'Every profile is assessed with direct oversight from an RCIC, ensuring your submission meets current IRCC criteria and minimizes avoidable processing delays.',
  whoAreWePrimaryCtaText: 'Free Consultation',
  whoAreWePrimaryCtaLink: 'https://wa.me/16475681009',
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
  aboutQuoteParagraph:
    'We believe Canadian immigration should be empowering, not overwhelming.',
  aboutBodyParagraph:
    'With personalized assessment and clear strategic direction, we help individuals, students, professionals, and families navigate Canadian immigration regulations with confidence.',
  aboutCtaText: 'Free Consultation',
  aboutCtaLink: 'https://wa.me/16475681009',

  // 05. Testimonials
  testimonialsEyebrow: 'CLIENT EXPERIENCES',
  testimonialsTitleMain: 'Trusted by clients',
  testimonialsTitleAccent: 'across the globe.',

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

  // 08. Contact
  contactEyebrow: 'READY WHEN YOU ARE',
  contactTitleMain: "Let's talk about\nwhat's",
  contactTitleAccent: 'next.',
  contactDescription:
    'Whether you have a clear plan or are just beginning to explore, reaching out for a free consultation is a good place to start.',
  contactSubmitButtonText: 'Free Consultation Request',
  contactDisclaimer:
    'By submitting, you agree to be contacted by Elvin Ediz Immigration Services.',
  contactServiceOptions: [
    'Study in Canada',
    'Work & Careers',
    'Family Sponsorship',
    'Permanent Residence',
    'Other',
  ],
};


export const backupStaff: StaffData[] = [
  {
    _id: 'staff-nazly',
    name: 'Nazly Sunguroglu',
    designation: 'RCIC',
    role: 'Regulated Canadian Immigration Consultant',
    subtitle: 'Founder of Elvin Ediz Immigration Services',
    photoUrl: '/nazly-profile-picture.png',
    email: 'info@elvinediz.com',
    order: 1,
    bio: `Elvin Ediz Immigration Services believes every individual is unique with a one-of-a-kind goal in life.

Our personalized approach believes that Pragmatism is the key to handling your case. Considering your circumstances will maximize the effectiveness of your application when you engage with our legal team, you will know your rights and options, if you qualify for a specific program, and the chances of a successful case.`,
  },
];

export const backupServices: ServiceData[] = [
  {
    _id: 'srv-visitor',
    title: 'Visitor Visa',
    slug: 'visitor-visa',
    order: 1,
    iconName: 'passport',
    summary:
      'Official documentation enabling short-term entry into Canada (up to 6 months) for tourism, family reunions, business trips, or medical visits.',
    features: [
      'Tourism & Family Visit Portfolios',
      'Super Visa for Parents & Grandparents',
      'Business Visitor Representation',
      'Stay Extensions & Status Restoration',
    ],
  },
  {
    _id: 'srv-temporary',
    title: 'Temporary Residency',
    slug: 'temporary-residency',
    order: 2,
    iconName: 'suitcase',
    summary:
      'Legal authorization to live, study, or work in Canada for a defined duration, structured with realistic pathways to future permanent residency.',
    features: [
      'Study Permits & Student Admissions',
      'Post-Graduation Work Permits (PGWP)',
      'Open & Employer-Specific Work Permits',
      'Visitor Record Extensions',
    ],
  },
  {
    _id: 'srv-permanent',
    title: 'Permanent Residency',
    slug: 'permanent-residency',
    order: 3,
    iconName: 'home',
    summary:
      'Long-term immigrant status conferring full rights to live, work, and study anywhere in Canada, serving as the direct gateway to Canadian citizenship.',
    features: [
      'Express Entry (FSW, CEC, FST)',
      'Provincial Nominee Programs (PNP)',
      'Spousal & Family Sponsorship',
      'PR Card Renewal & Citizenship',
    ],
  },
  {
    _id: 'srv-startup',
    title: 'Start-Up Visa Program',
    slug: 'start-up-visa-program',
    order: 4,
    iconName: 'briefcase',
    summary:
      'Custom pathway designed for innovative global entrepreneurs targeting Canadian market expansion and direct permanent residency.',
    features: [
      'Designated Venture Pitch Preparation',
      'Comprehensive Business Plan Strategy',
      'Immediate Work Permit & Direct PR Route',
      'Co-Founder & Family Inclusion',
    ],
  },
  {
    _id: 'srv-lmia',
    title: 'LMIA (Labour Market Assessment)',
    slug: 'lmia',
    order: 5,
    iconName: 'file-text',
    summary:
      'Labour Market Impact Assessment documentation granting Canadian employers legal authority to recruit and hire skilled foreign workers.',
    features: [
      'Employer Compliance & Audit Defense',
      'High-Wage & Low-Wage Streams',
      'Global Talent Stream Expedited Route',
      'Work Permit Application Management',
    ],
  },
];

export const backupTestimonials: TestimonialData[] = [
  {
    _id: 't-1',
    author: 'Ertan Sokmen',
    location: 'France',
    rating: 5,
    quote:
      'I am extremely impressed with the professionalism and expertise Ms. Nazly brought to my case. Once Ms. Nazly took over, everything moved forward smoothly and efficiently.',
  },
  {
    _id: 't-2',
    author: 'Sarah D',
    location: 'Toronto, ON',
    rating: 5,
    quote:
      'We applied for my mother. During this time, everything was very easy and our visa was approved. The questions were answered as soon as possible and necessary guidance given on time.',
  },
  {
    _id: 't-3',
    author: 'Aysen Gunerli',
    location: 'Canada',
    rating: 5,
    quote:
      'Working with Nazlı was a wonderful experience. We proceeded very professionally and clearly at every stage. I could easily reach her whenever I needed.',
  },
  {
    _id: 't-4',
    author: 'Ben C.',
    location: 'Canada',
    rating: 5,
    quote:
      "I used Elvin Ediz Immigration Services for my parents' visa application. Nazly handled everything smoothly and made the process much easier for us.",
  },
  {
    _id: 't-5',
    author: 'JD',
    location: 'Toronto, ON',
    rating: 5,
    quote:
      'Nazli is super kind, helpful, and always easy to reach. This made the whole visa process so much less stressful. I’d highly recommend her to anyone!',
  },
];

export const backupInsightsPage: InsightsPageData = {
  eyebrow: 'PERSPECTIVE & GUIDANCE',
  titleMain: 'Knowledge & Guidance for your',
  titleAccent: 'Canadian journey.',
  description:
    'In-depth strategic insights, practical immigration guides, policy announcements, and Canadian immigration news from Elvin Ediz Immigration Services.',

  insightsEyebrow: 'IN-DEPTH PERSPECTIVE',
  insightsTitleMain: 'Featured',
  insightsTitleAccent: 'Insights',
  insightsDescription: 'Thought leadership and strategic perspectives on Canadian immigration pathways.',

  infoEyebrow: 'PRACTICAL GUIDES & INFO',
  infoTitleMain: 'Immigration',
  infoTitleAccent: 'Knowledge Base',
  infoDescription: 'Actionable explanations, checklists, and key application criteria answered clearly.',

  announcementsEyebrow: 'OFFICIAL NOTICES',
  announcementsTitle: 'Announcements',
  announcementsEmptyMessage: 'No urgent announcements at this time.',

  newsEyebrow: 'LATEST UPDATES',
  newsTitle: 'Immigration News',
  newsEmptyMessage: 'No recent news articles yet.',

  consultationEyebrow: 'Direct Consultation',
  consultationTitle: 'Have a specific question about your case?',
  consultationDescription:
    'Connect with Nazly Sunguroglu, RCIC for a one-on-one assessment of your Canadian immigration pathway.',
  consultationButtonText: 'Message on WhatsApp',
  consultationButtonLink: 'https://wa.me/16475681009',
};

export const backupPosts: PostData[] = [
  // Insights
  {
    _id: 'post-1',
    slug: 'planning-your-next-move-to-canada',
    kind: 'insight',
    title: 'What to know before planning your next move to Canada',
    excerpt:
      'A grounded starting point for exploring your future in Canada, navigating CRS draws, and understanding program requirements.',
    publishedAt: '2026-06-12T10:00:00.000Z',
    authorName: 'Nazly Sunguroglu',
    authorRole: 'RCIC Consultant',
  },
  {
    _id: 'post-2',
    slug: 'making-your-study-plan-achievable',
    kind: 'insight',
    title: 'Making your Canadian study plan feel more achievable',
    excerpt:
      'How to choose the right Designated Learning Institution (DLI), understand post-graduation work permits (PGWP), and budget realistically.',
    publishedAt: '2026-05-28T14:30:00.000Z',
    authorName: 'Nazly Sunguroglu',
    authorRole: 'RCIC Consultant',
  },
  {
    _id: 'post-3',
    slug: 'navigating-express-entry-category-based-selection',
    kind: 'insight',
    title: 'Strategic Guide to Category-Based Express Entry Selections',
    excerpt:
      'Understanding priority occupation categories including STEM, healthcare, trades, and French-language proficiency in Express Entry.',
    publishedAt: '2026-05-15T09:00:00.000Z',
    authorName: 'Nazly Sunguroglu',
    authorRole: 'RCIC Consultant',
  },

  // Information Guides
  {
    _id: 'post-4',
    slug: 'questions-before-your-application',
    kind: 'information',
    title: 'Three crucial questions to ask before beginning your application',
    excerpt:
      'Clarity at the beginning prevents costly delays: timeline expectations, document readiness, and principal applicant eligibility.',
    publishedAt: '2026-05-09T11:00:00.000Z',
    authorName: 'Elvin Ediz Immigration Team',
    authorRole: 'Advisory Board',
  },
  {
    _id: 'post-5',
    slug: 'visitor-visa-document-checklist-guide',
    kind: 'information',
    title: 'Visitor Visa Document Audit: Preventing Common Refusal Grounds',
    excerpt:
      'An itemized checklist covering proof of financial support, ties to your home country, and invitation letter formulation.',
    publishedAt: '2026-04-20T08:00:00.000Z',
    authorName: 'Elvin Ediz Immigration Team',
    authorRole: 'Advisory Board',
  },
  {
    _id: 'post-6',
    slug: 'spousal-sponsorship-eligibility-roadmap',
    kind: 'information',
    title: 'Spousal Sponsorship Roadmap: In-Canada vs Outside-Canada Applications',
    excerpt:
      'Step-by-step breakdown of processing timelines, open work permit eligibility, and relationship genuineness documentation.',
    publishedAt: '2026-04-02T13:00:00.000Z',
    authorName: 'Elvin Ediz Immigration Team',
    authorRole: 'Advisory Board',
  },

  // Announcements
  {
    _id: 'post-7',
    slug: 'ircc-updates-study-permit-financial-requirements',
    kind: 'announcement',
    title: 'IRCC Cost-of-Living Financial Requirement Update for Study Permits',
    excerpt:
      'Effective immediately, all study permit applicants must verify updated cost-of-living funds alongside first-year tuition fees.',
    publishedAt: '2026-06-01T12:00:00.000Z',
    authorName: 'Elvin Ediz Immigration',
    authorRole: 'Office Announcement',
  },
  {
    _id: 'post-8',
    slug: 'summer-consultation-schedule-and-online-intake',
    kind: 'announcement',
    title: 'Extended Online Consultation Hours & Direct WhatsApp Intake Active',
    excerpt:
      'Our team is offering extended consultation slots for fall semester student admissions and LMIA assessments.',
    publishedAt: '2026-05-20T10:00:00.000Z',
    authorName: 'Elvin Ediz Immigration',
    authorRole: 'Office Announcement',
  },

  // News
  {
    _id: 'post-9',
    slug: 'canada-immigration-levels-plan-key-highlights',
    kind: 'news',
    title: 'Canada Immigration Levels Plan: Targeted PR Admissions & Provincial Allocations',
    excerpt:
      'Federal projections highlight sustained focus on in-country temporary resident transitions and regional economic growth.',
    publishedAt: '2026-06-10T16:00:00.000Z',
    sourceURL: 'https://www.canada.ca/en/immigration-refugees-citizenship.html',
    authorName: 'Immigration Newsroom',
  },
  {
    _id: 'post-10',
    slug: 'ontario-oinp-draw-announces-invitations-for-tech-health',
    kind: 'news',
    title: 'Ontario Immigrant Nominee Program (OINP) Issues Targeted Invitations',
    excerpt:
      'The latest provincial draw issued notifications of interest to skilled candidates in high-demand technology and healthcare sectors.',
    publishedAt: '2026-06-04T15:00:00.000Z',
    sourceURL: 'https://www.ontario.ca/page/oinp-express-entry-notifications-interest',
    authorName: 'Immigration Newsroom',
  },
];

