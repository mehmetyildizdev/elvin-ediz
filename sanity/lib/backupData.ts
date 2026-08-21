import type {
  SiteSettingsData,
  HomePageData,
  StaffData,
  ServiceData,
  ServicesPageData,
  TestimonialData,
  GoogleReviewsData,
  InsightsPageData,
  PostData,
  AboutPageData,
} from './types';

export const backupSiteSettings: SiteSettingsData = {
  siteTitle: 'Elvin Ediz Immigration Services',
  contactEmail: 'info@elvinediz.com',
  phone: '(647) 568 1009',
  officeHours: 'Mon - Fri: 09:00am - 4:00pm',
  address: 'Toronto, Ontario, Canada',
  consultationLink: 'https://wa.me/123456789',
  whatsappNumber: '123456789',
  linkedinUrl: 'https://www.linkedin.com/in/nazly-sunguroglu-31574455/',
  instagramUrl: 'https://www.instagram.com/elvinedizimmigration/',
  headerNav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Insights', href: '/insights' },
    { label: 'Q&A', href: '/questions' },
    { label: 'Contact', href: '/contact' },
  ],
  footerDescription:
    'Guidance for your next chapter in Canada. Personal, regulated Canadian immigration consulting.',
  footerNavTitle: 'Explore',
  footerNav: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Insights', href: '/insights' },
    { label: 'Q&A', href: '/questions' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  footerConnectTitle: 'Connect',
  footerConsultationText: 'Free Consultation',
  footerPrivacyText: 'Privacy Policy',
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
      'A Visitor Visa (Temporary Resident Visa) is an official document allowing foreign nationals to enter Canada for a short stay (usually up to six months) for tourism, family visits, business engagements, or medical consultations.',
    features: [
      'Family Visit Visa (Family events & reunions)',
      'Business Visit Visa (Conferences & business meetings)',
      'Medical Visit Visa (Treatment & doctor consultations)',
      'General Tourism Visa (Leisure & sightseeing)',
      'Temporary Resident Status Representation',
      'Stay Extensions & Status Restoration',
    ],
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'b1-s',
            _type: 'span',
            marks: [],
            text: 'Overview of Canadian Visitor Visa (TRV)',
          },
        ],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'b2-s1',
            _type: 'span',
            marks: [],
            text: 'A ',
          },
          {
            _key: 'b2-s2',
            _type: 'span',
            marks: ['strong'],
            text: 'Visitor Visa (Temporary Resident Visa)',
          },
          {
            _key: 'b2-s3',
            _type: 'span',
            marks: [],
            text: ' is an official document issued by Immigration, Refugees and Citizenship Canada (IRCC) that allows foreign nationals to enter Canada for a short stay, usually up to ',
          },
          {
            _key: 'b2-s4',
            _type: 'span',
            marks: ['strong'],
            text: 'six months',
          },
          {
            _key: 'b2-s5',
            _type: 'span',
            marks: [],
            text: '. It is mainly intended for tourism, visiting family or friends, conducting business meetings, or medical consultations.',
          },
        ],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'b3-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Important Rule: ',
          },
          {
            _key: 'b3-s2',
            _type: 'span',
            marks: [],
            text: 'A visitor visa does not allow you to work or study in programs longer than six months. If you wish to stay longer, you must apply for an extension (Visitor Record) before your current status expires.',
          },
        ],
      },
      {
        _key: 'b4',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'b4-s',
            _type: 'span',
            marks: [],
            text: 'Available Visitor Visa Streams',
          },
        ],
      },
      {
        _key: 'b5',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'b5-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Family Visit Visa: ',
          },
          {
            _key: 'b5-s2',
            _type: 'span',
            marks: [],
            text: 'For individuals wishing to visit close family members, children, parents, or relatives in Canada for milestones, birthdays, weddings, or family reunions.',
          },
        ],
      },
      {
        _key: 'b6',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'b6-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Business Visit Visa: ',
          },
          {
            _key: 'b6-s2',
            _type: 'span',
            marks: [],
            text: 'For professionals traveling to Canada for short-term commercial purposes—such as attending corporate meetings, industry conferences, trade exhibitions, or exploring investment opportunities.',
          },
        ],
      },
      {
        _key: 'b7',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'b7-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Medical Visit (Treatment / Consultation) Visa: ',
          },
          {
            _key: 'b7-s2',
            _type: 'span',
            marks: [],
            text: 'For individuals coming to Canada to seek medical treatment, surgery, or specialized consultations with Canadian physicians. Proof of appointment and financial support is required.',
          },
        ],
      },
      {
        _key: 'b8',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'b8-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'General Tourism Visa: ',
          },
          {
            _key: 'b8-s2',
            _type: 'span',
            marks: [],
            text: 'The standard visitor visa for travelers who want to explore Canada’s vibrant cities, iconic national parks, and cultural attractions for leisure and vacation.',
          },
        ],
      },
      {
        _key: 'b9',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'b9-s',
            _type: 'span',
            marks: [],
            text: 'Temporary Resident Status',
          },
        ],
      },
      {
        _key: 'b10',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'b10-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Temporary Resident Status',
          },
          {
            _key: 'b10-s2',
            _type: 'span',
            marks: [],
            text: ' allows a person to stay in Canada legally for a limited period, usually up to six months, as a visitor, student, or worker. It does not confer permanent residency rights, and visitors must depart before expiration or apply for a timely status extension.',
          },
        ],
      },
    ],
    ctaTitle: 'Apply for a Canadian Visitor Visa',
    ctaSubtitle:
      'Connect directly with Nazly Sunguroglu, RCIC for comprehensive application assessment and representation.',
    ctaButtonText: 'Start Visitor Visa Application',
  },
  {
    _id: 'srv-temporary',
    title: 'Temporary Residency',
    slug: 'temporary-residency',
    order: 2,
    iconName: 'suitcase',
    summary:
      'Temporary Resident Status allows foreign nationals to stay in Canada legally for a defined period as a visitor, student, or worker, with structured pathways to transition to permanent residency.',
    features: [
      'Open Work Permit (Work for any employer in Canada)',
      'Employer-Specific Work Permit (Designated employer authorization)',
      'Study Permit Holder (Recognized Canadian DLI institutions)',
      'Refugee & Asylum Status Protection',
      'Spousal Open Work & Study Permits',
      'Status Extensions & Visitor Record Portfolios',
    ],
    body: [
      {
        _key: 'tr-b1',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'tr-b1-s',
            _type: 'span',
            marks: [],
            text: 'Temporary Resident Status in Canada',
          },
        ],
      },
      {
        _key: 'tr-b2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'tr-b2-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Temporary Resident Status',
          },
          {
            _key: 'tr-b2-s2',
            _type: 'span',
            marks: [],
            text: ' allows a person to stay in Canada legally for a limited time—typically up to six months or the duration specified on your permit—as a visitor, student, or foreign worker. While temporary status does not grant permanent rights, it serves as the foundational milestone for building Canadian experience and qualifying for permanent residency.',
          },
        ],
      },
      {
        _key: 'tr-b3',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'tr-b3-s',
            _type: 'span',
            marks: [],
            text: 'Types of Residency Status in Canada',
          },
        ],
      },
      {
        _key: 'tr-b4',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'tr-b4-s',
            _type: 'span',
            marks: [],
            text: 'Start your Canadian journey with a temporary permit and strategically position yourself for future permanent residency:',
          },
        ],
      },
      {
        _key: 'tr-b5',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'tr-b5-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Open Work Permit: ',
          },
          {
            _key: 'tr-b5-s2',
            _type: 'span',
            marks: [],
            text: 'You can work for almost any Canadian employer without industry or geographical restrictions.',
          },
        ],
      },
      {
        _key: 'tr-b6',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'tr-b6-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Employer Specific Work Permit: ',
          },
          {
            _key: 'tr-b6-s2',
            _type: 'span',
            marks: [],
            text: 'Work for a designated Canadian employer who holds a positive LMIA or LMIA-exempt approval.',
          },
        ],
      },
      {
        _key: 'tr-b7',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'tr-b7-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Study Permit Holder: ',
          },
          {
            _key: 'tr-b7-s2',
            _type: 'span',
            marks: [],
            text: 'Authorized enrollment at recognized Designated Learning Institutions (DLIs) across Canadian provinces.',
          },
        ],
      },
      {
        _key: 'tr-b8',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'tr-b8-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Refugee / Asylum Status: ',
          },
          {
            _key: 'tr-b8-s2',
            _type: 'span',
            marks: [],
            text: 'Legal protection and temporary status for individuals seeking asylum and humanitarian relief.',
          },
        ],
      },
      {
        _key: 'tr-b9',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'tr-b9-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Spousal Work / Study Permit: ',
          },
          {
            _key: 'tr-b9-s2',
            _type: 'span',
            marks: [],
            text: 'Authorization for spouses and common-law partners of qualifying permit holders to work or study in Canada.',
          },
        ],
      },
      {
        _key: 'tr-b10',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'tr-b10-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Important Notice: ',
          },
          {
            _key: 'tr-b10-s2',
            _type: 'span',
            marks: [],
            text: 'International students and temporary visa holders pay higher tuition rates and typically cannot access provincial health coverage until they obtain permanent residency.',
          },
        ],
      },
    ],
    ctaTitle: 'Apply for Temporary Residency in Canada',
    ctaSubtitle:
      'Consult directly with Nazly Sunguroglu, RCIC to assess study permits, work permits, or status extensions.',
    ctaButtonText: 'Assess Temporary Residency',
  },
  {
    _id: 'srv-permanent',
    title: 'Permanent Residency',
    slug: 'permanent-residency',
    order: 3,
    iconName: 'home',
    summary:
      'Permanent Residency (PR) confers the right to live, work, and study anywhere in Canada on a long-term basis with full access to healthcare and social benefits, serving as the direct gateway to Canadian citizenship.',
    features: [
      'Express Entry (FSW, CEC, FST points-based system)',
      'Family & Spousal Sponsorship',
      'Provincial Nominee Programs (PNP Streams)',
      'Refugee & Humanitarian Settlement',
      'Start-Up Visa & Business PR Pathways',
      'Canadian Citizenship Application Support',
    ],
    body: [
      {
        _key: 'pr-b1',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'pr-b1-s',
            _type: 'span',
            marks: [],
            text: 'Permanent Residency in Canada',
          },
        ],
      },
      {
        _key: 'pr-b2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'pr-b2-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Permanent Residency (PR)',
          },
          {
            _key: 'pr-b2-s2',
            _type: 'span',
            marks: [],
            text: ' is the official status that allows a person to live, work, and study anywhere in Canada on a permanent, long-term basis. Permanent residents enjoy many of the same rights as Canadian citizens, including access to universal healthcare and social benefits. After meeting residency requirements, permanent residents become eligible to apply for Canadian citizenship.',
          },
        ],
      },
      {
        _key: 'pr-b3',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'pr-b3-s',
            _type: 'span',
            marks: [],
            text: 'Permanent Residency Pathways',
          },
        ],
      },
      {
        _key: 'pr-b4',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'pr-b4-s',
            _type: 'span',
            marks: [],
            text: 'Achieve your long-term residence in Canada through proven, strategic immigration programs:',
          },
        ],
      },
      {
        _key: 'pr-b5',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'pr-b5-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Express Entry (Points-Based System): ',
          },
          {
            _key: 'pr-b5-s2',
            _type: 'span',
            marks: [],
            text: 'Apply from inside or outside Canada. Eligible work or study permit holders and skilled professionals can qualify if they meet the Comprehensive Ranking System (CRS) score cutoff.',
          },
        ],
      },
      {
        _key: 'pr-b6',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'pr-b6-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Family & Spousal Sponsorship: ',
          },
          {
            _key: 'pr-b6-s2',
            _type: 'span',
            marks: [],
            text: 'Secure permanent residency through sponsorship by a Canadian citizen or permanent resident spouse, partner, parent, or child.',
          },
        ],
      },
      {
        _key: 'pr-b7',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'pr-b7-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Start-Up Visa Program: ',
          },
          {
            _key: 'pr-b7-s2',
            _type: 'span',
            marks: [],
            text: 'Designed for innovative entrepreneurs—one of the fastest and most reliable direct PR pathways with a supported business idea.',
          },
        ],
      },
      {
        _key: 'pr-b8',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'pr-b8-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Refugee & Humanitarian Status: ',
          },
          {
            _key: 'pr-b8-s2',
            _type: 'span',
            marks: [],
            text: 'Legal recognition as a protected person or refugee provides a direct route to Canadian permanent residency.',
          },
        ],
      },
      {
        _key: 'pr-b9',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'pr-b9-s',
            _type: 'span',
            marks: [],
            text: 'Explore the pathways that best fit your future in Canada. Whether through Express Entry, family sponsorship, or entrepreneurial programs, we guide you toward permanent residency with clarity and confidence.',
          },
        ],
      },
    ],
    ctaTitle: 'Achieve Canadian Permanent Residency',
    ctaSubtitle: 'Direct representation and CRS points assessment with Nazly Sunguroglu, RCIC.',
    ctaButtonText: 'Start PR Assessment',
  },
  {
    _id: 'srv-startup',
    title: 'Start-Up Visa Program',
    slug: 'start-up-visa-program',
    order: 4,
    iconName: 'briefcase',
    summary:
      'Canada’s Start-Up Visa Program is designed for innovative entrepreneurs who want to establish a high-growth business in Canada and secure direct permanent residency for themselves and their families.',
    features: [
      'Direct Pathway to Permanent Residency (Applicant & Family)',
      'Designated Angel / VC / Incubator Support',
      'Free Public Schooling for Children',
      'Domestic Post-Secondary Tuition Rates',
      'Full Access to Canada’s Public Healthcare System',
      'Zero Net Worth & Minimum Capital Constraints',
    ],
    body: [
      {
        _key: 'su-b1',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'su-b1-s',
            _type: 'span',
            marks: [],
            text: 'What is the Start-Up Visa Program?',
          },
        ],
      },
      {
        _key: 'su-b2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'su-b2-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Canada’s Start-Up Visa Program (SUV)',
          },
          {
            _key: 'su-b2-s2',
            _type: 'span',
            marks: [],
            text: ' is designed for innovative foreign entrepreneurs who want to start a business in Canada and become permanent residents. It provides a direct pathway to Canadian Permanent Residency for founders and their immediate families.',
          },
        ],
      },
      {
        _key: 'su-b3',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'su-b3-s',
            _type: 'span',
            marks: [],
            text: 'Who Can Apply?',
          },
        ],
      },
      {
        _key: 'su-b4',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'su-b4-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Innovative Founders: ',
          },
          {
            _key: 'su-b4-s2',
            _type: 'span',
            marks: [],
            text: 'Entrepreneurs with a viable, innovative business concept with global scalability potential.',
          },
        ],
      },
      {
        _key: 'su-b5',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'su-b5-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Designated Organization Support: ',
          },
          {
            _key: 'su-b5-s2',
            _type: 'span',
            marks: [],
            text: 'A formal letter of support from an approved Venture Capital Fund, Angel Investor Group, or Business Incubator in Canada.',
          },
        ],
      },
      {
        _key: 'su-b6',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'su-b6-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Language & Settlement Funds: ',
          },
          {
            _key: 'su-b6-s2',
            _type: 'span',
            marks: [],
            text: 'Applicants who meet minimum language proficiency (CLB 5) and required settlement funds for relocation.',
          },
        ],
      },
      {
        _key: 'su-b7',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'su-b7-s',
            _type: 'span',
            marks: [],
            text: 'Why Choose the Start-Up Visa?',
          },
        ],
      },
      {
        _key: 'su-b8',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'su-b8-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Direct Permanent Residency: ',
          },
          {
            _key: 'su-b8-s2',
            _type: 'span',
            marks: [],
            text: 'Direct pathway to Permanent Residency for you and your family members.',
          },
        ],
      },
      {
        _key: 'su-b9',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'su-b9-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Economic Stability: ',
          },
          {
            _key: 'su-b9-s2',
            _type: 'span',
            marks: [],
            text: 'Opportunity to build and scale your venture in one of the world’s most stable and transparent economies.',
          },
        ],
      },
      {
        _key: 'su-b10',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'su-b10-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Strong Ecosystem: ',
          },
          {
            _key: 'su-b10-s2',
            _type: 'span',
            marks: [],
            text: 'Access to Canada’s venture capital networks, North American trade agreements, and skilled workforce.',
          },
        ],
      },
      {
        _key: 'su-b11',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'su-b11-s',
            _type: 'span',
            marks: [],
            text: 'Comprehensive Family Benefits & Education Savings',
          },
        ],
      },
      {
        _key: 'su-b12',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'su-b12-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Universal Healthcare: ',
          },
          {
            _key: 'su-b12-s2',
            _type: 'span',
            marks: [],
            text: 'Family members get full access to Canada’s public healthcare system without costly private insurance.',
          },
        ],
      },
      {
        _key: 'su-b13',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'su-b13-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Free Public Schooling for Children: ',
          },
          {
            _key: 'su-b13-s2',
            _type: 'span',
            marks: [],
            text: 'Children attend Canadian public primary and secondary schools for free, avoiding high international student tuition fees.',
          },
        ],
      },
      {
        _key: 'su-b14',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'su-b14-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Domestic University Tuition: ',
          },
          {
            _key: 'su-b14-s2',
            _type: 'span',
            marks: [],
            text: 'Access domestic tuition rates at Canadian colleges and universities (saving 2–4x compared to international student rates).',
          },
        ],
      },
      {
        _key: 'su-b15',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'su-b15-s',
            _type: 'span',
            marks: [],
            text: 'Live, work, and study in Canada without the extra costs associated with temporary residency, saving tens of thousands of dollars on education and healthcare.',
          },
        ],
      },
    ],
    ctaTitle: 'Launch Your Business in Canada',
    ctaSubtitle:
      'Connect with Nazly Sunguroglu, RCIC for comprehensive Start-Up Visa business review and application preparation.',
    ctaButtonText: 'Start-Up Visa Consultation',
  },
  {
    _id: 'srv-lmia',
    title: 'LMIA',
    slug: 'lmia',
    order: 5,
    iconName: 'certificate',
    summary:
      'A Labour Market Impact Assessment (LMIA) issued by ESDC allows Canadian employers to hire foreign workers when no Canadian citizen or permanent resident is available, confirming a positive or neutral impact on the Canadian labor market.',
    features: [
      'High-Wage & Low-Wage LMIA Streams',
      'Global Talent Stream (Fast-Track 2-Week Processing)',
      'Dual-Intent LMIA (50–200 Express Entry CRS Points)',
      'Employer ESDC Compliance & Advertising Guidance',
      'LMIA-Exempt Work Permits (Intra-Company, Trade Treaties)',
      'Foreign Worker Recruitment & Transition Plans',
    ],
    body: [
      {
        _key: 'lm-b1',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'lm-b1-s',
            _type: 'span',
            marks: [],
            text: 'What is LMIA?',
          },
        ],
      },
      {
        _key: 'lm-b2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'lm-b2-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'A Labour Market Impact Assessment (LMIA)',
          },
          {
            _key: 'lm-b2-s2',
            _type: 'span',
            marks: [],
            text: ' is an official document issued by Employment and Social Development Canada (ESDC) that allows Canadian employers to hire foreign workers. It confirms that hiring a foreign worker will not negatively impact the Canadian labor market.',
          },
        ],
      },
      {
        _key: 'lm-b3',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'lm-b3-s',
            _type: 'span',
            marks: [],
            text: 'In simple terms: It is an employer’s official government approval to bring in skilled or semi-skilled workers from outside Canada.',
          },
        ],
      },
      {
        _key: 'lm-b4',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'lm-b4-s',
            _type: 'span',
            marks: [],
            text: 'Benefits of LMIA for Business Owners',
          },
        ],
      },
      {
        _key: 'lm-b5',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'lm-b5-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Access to Skilled Talent: ',
          },
          {
            _key: 'lm-b5-s2',
            _type: 'span',
            marks: [],
            text: 'Hire employees with specialized skills not readily available locally and fill critical position gaps to scale operations.',
          },
        ],
      },
      {
        _key: 'lm-b6',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'lm-b6-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Business Expansion & Continuity: ',
          },
          {
            _key: 'lm-b6-s2',
            _type: 'span',
            marks: [],
            text: 'Quickly onboard foreign workers to support seasonal peaks, new contracts, and maintain operations without labor shortages.',
          },
        ],
      },
      {
        _key: 'lm-b7',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'lm-b7-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Pathway to Permanent Residency: ',
          },
          {
            _key: 'lm-b7-s2',
            _type: 'span',
            marks: [],
            text: 'Certain LMIA-supported employees can apply for permanent residency, helping retain valuable talent long-term.',
          },
        ],
      },
      {
        _key: 'lm-b8',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'lm-b8-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Flexible Hiring Options: ',
          },
          {
            _key: 'lm-b8-s2',
            _type: 'span',
            marks: [],
            text: 'LMIA permits hiring for full-time, seasonal, or temporary positions depending on business requirements.',
          },
        ],
      },
      {
        _key: 'lm-b9',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          {
            _key: 'lm-b9-s1',
            _type: 'span',
            marks: ['strong'],
            text: 'Competitive Advantage: ',
          },
          {
            _key: 'lm-b9-s2',
            _type: 'span',
            marks: [],
            text: 'Attract international expertise and multilingual capabilities to drive innovation and business growth.',
          },
        ],
      },
    ],
    ctaTitle: 'Employer LMIA Consultation & Filing',
    ctaSubtitle:
      'Guiding Canadian businesses through Job Bank recruitment, ESDC submissions, and foreign worker work permits.',
    ctaButtonText: 'Schedule LMIA Consultation',
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

export const backupGoogleReviews: GoogleReviewsData = {
  businessName: 'Elvin Ediz Immigration Services',
  rating: 4.9,
  totalReviews: 73,
  googleMapsUrl:
    'https://www.google.com/maps/place/Elvin+Ediz+Immigration+Services/@43.846367,-79.383731,17z/data=!4m6!3m5!1s0x42609be984f53c27:0x8157fbe4a4cd3191!8m2!3d43.846367!4d-79.383731!16s%2Fg%2F11qb5x2mcv',
  writeReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJNzT1hOmbYEERkTHNpOT7V4E',
  lastSyncedAt: new Date().toISOString(),
  reviews: [
    {
      author: 'Salim Furkan ÖZTÜRK',
      rating: 5,
      date: 'Recent',
      quote:
        'Exceptional service and clear guidance throughout the entire immigration process. Nazly was extremely supportive and professional.',
      highlight: true,
    },
    {
      author: 'Snyldz Yldz',
      rating: 5,
      date: 'Recent',
      quote:
        'Great experience with Elvin Ediz Immigration Services. Every question was answered promptly with honest, clear guidance.',
      highlight: true,
    },
    {
      author: 'Buse Şahingöklü',
      rating: 5,
      date: 'Recent',
      quote:
        'Professional, trustworthy, and very knowledgeable. Nazly handled our case with utmost dedication.',
      highlight: true,
    },
    {
      author: 'Ertan Sokmen',
      rating: 5,
      date: 'Recent',
      quote:
        'I am extremely impressed with the professionalism and expertise Ms. Nazly brought to my case. Once she took over, everything moved smoothly.',
      highlight: true,
    },
    {
      author: 'Sarah D.',
      rating: 5,
      date: 'Recent',
      quote:
        'We applied for my mother. Everything was very easy and our visa was approved. Guidance was provided accurately on time.',
      highlight: true,
    },
  ],
};

export const backupServicesPage: ServicesPageData = {
  _id: 'servicesPage',
  eyebrow: 'HOW WE CAN HELP',
  titleMain: 'A pathway built',
  titleAccent: 'around you.',
  description:
    'Personalized Canadian immigration guidance for the next chapter you are ready to build.',

  pathwayNavTitle: 'Select Pathway',
  pathwayNumberPrefix: 'PATHWAY',
  rcicAssessedBadgeText: 'RCIC Assessed',
  pathwaySummaryTitle: 'Pathway Summary',
  featuresSectionTitle: 'Key Requirements & Inclusions',
  detailedOverviewTitle: 'Detailed Pathway Overview',

  calloutEyebrow: 'NOT SURE WHERE TO BEGIN?',
  calloutTitleMain: 'We can find the',
  calloutTitleAccent: 'right starting point.',
  calloutButtonText: 'Free Consultation',
};

export const backupInsightsPage: InsightsPageData = {
  eyebrow: 'PERSPECTIVE & GUIDANCE',
  titleMain: 'Knowledge & Guidance for your',
  titleAccent: 'Canadian journey.',
  description:
    'In-depth strategic insights, practical immigration guides, policy announcements, and Canadian immigration news from Elvin Ediz Immigration Services.',

  categoryNavLabel: 'Browse By Category:',
  categoryInsightsLabel: 'Featured Insights',
  categoryGuidesLabel: 'Practical Guides',
  categoryAnnouncementsLabel: 'Official Notices',
  categoryNewsLabel: 'Immigration News',
  categoryQaPrompt: 'Have a specific question? Visit Q&A →',
  sectionDividerBadgeText: 'Knowledge Base & Community Updates',
  paginationPrevText: 'Prev',
  paginationNextText: 'Next',
  breadcrumbBackToHubText: 'Back to insights & updates',

  insightsEyebrow: 'IN-DEPTH PERSPECTIVE',
  insightsTitleMain: 'Featured',
  insightsTitleAccent: 'Insights',
  insightsDescription:
    'Thought leadership and strategic perspectives on Canadian immigration pathways.',
  insightsReadArticleText: 'Read article',
  insightsEmptyMessage: 'No insight articles available currently.',

  infoEyebrow: 'PRACTICAL GUIDES & INFO',
  infoTitleMain: 'Immigration',
  infoTitleAccent: 'Knowledge Base',
  infoDescription:
    'Actionable explanations, checklists, and key application criteria answered clearly.',
  infoViewAllText: 'All Guides →',
  infoBadgeText: 'Practical Guide',
  infoCuratedByText: 'Curated by Elvin Ediz Immigration Advisory',
  infoExploreGuideText: 'Explore guide',
  infoChecklistStepText: 'Checklist Step',
  infoChecklistStepsText: 'Checklist Steps',
  infoChecklistKeyItemsTitle: 'Key Checklist Items:',
  infoViewFullGuideActionText: 'View full guide & checklist',
  infoConsultantActionText: 'Inquire with Consultant',
  infoMorePointsText: 'more checklist points in full guide',
  infoEmptyMessage: 'No practical guides found.',

  announcementsEyebrow: 'OFFICIAL NOTICES',
  announcementsTitle: 'Announcements',
  announcementsEmptyMessage: 'No urgent announcements at this time.',
  announcementsViewAllText: 'All →',
  announcementsBadgeText: 'Official Notice',
  announcementsEffectivePrefix: 'Effective:',
  announcementsActionTitle: 'Action Recommended:',
  announcementsViewActionText: 'View announcement',
  announcementsViewFullActionText: 'View full notice & action steps',
  announcementsInquireActionText: 'Inquire with RCIC',

  newsEyebrow: 'LATEST UPDATES',
  newsTitle: 'Immigration News',
  newsEmptyMessage: 'No recent news articles yet.',
  newsViewAllText: 'All →',
  newsFeaturedBadgeText: 'Featured News',
  newsReadStoryText: 'Read story',
  newsReadActionText: 'Read',
  newsSourceLabel: 'Source',

  consultationEyebrow: 'Direct Consultation',
  consultationTitle: 'Have a specific question about your case?',
  consultationDescription:
    'Connect with Nazly Sunguroglu, RCIC for a one-on-one assessment of your Canadian immigration pathway.',
  consultationButtonText: 'Message on WhatsApp',
  consultationButtonLink: 'https://wa.me/123456789',
};

export const backupPosts: PostData[] = [
  // Insights
  {
    _id: 'post-insight-express-entry-category-based-selection',
    slug: 'navigating-express-entry-category-based-selection',
    kind: 'insight',
    category: 'Express Entry & PR',
    iconName: 'sparkles',
    title:
      'Navigating Express Entry Category-Based Selection: Strategic Occupations & French Advantage',
    excerpt:
      "An in-depth analysis of targeted draws for STEM, Healthcare, Trades, and French language proficiency under Canada's Category-Based Express Entry system.",
    publishedAt: '2026-08-18T14:00:00.000Z',
    authorName: 'Nazly Sunguroglu, RCIC',
    authorRole: 'Regulated Canadian Immigration Consultant',
    authorOversightIcon: 'sparkles',
    authorOversightTitle: 'Author Oversight',
    authorOversightSubtitle: 'CICC Licensed #R533968',
    authorOversightText:
      'Every insight is reviewed under the direct supervision of Nazly Sunguroglu, RCIC, founder of Elvin Ediz Immigration Services in Toronto.',
    authorOversightCtaText: 'Consult on Express Entry',
  },
  {
    _id: 'post-insight-making-study-plan-achievable-pgwp',
    slug: 'making-your-study-plan-achievable',
    kind: 'insight',
    category: 'Study in Canada & PGWP',
    iconName: 'graduation-cap',
    title: 'Strategic Planning for Canadian Study Permits, DLIs, and PGWP Eligibility Regulations',
    excerpt:
      'A realistic roadmap to choosing accredited Designated Learning Institutions, managing Provincial Attestation Letters (PAL), and structuring post-graduation work permit transitions.',
    publishedAt: '2026-08-16T11:30:00.000Z',
    authorName: 'Nazly Sunguroglu, RCIC',
    authorRole: 'Regulated Canadian Immigration Consultant',
    authorOversightIcon: 'school',
    authorOversightTitle: 'Author Oversight',
    authorOversightSubtitle: 'CICC Licensed #R533968',
    authorOversightText:
      'Every insight is reviewed under the direct supervision of Nazly Sunguroglu, RCIC, founder of Elvin Ediz Immigration Services in Toronto.',
    authorOversightCtaText: 'Consult on Study Pathways',
  },
  {
    _id: 'post-insight-lmia-employer-compliance-global-talent',
    slug: 'lmia-employer-compliance-and-global-talent-pathways',
    kind: 'insight',
    category: 'Work Permits & LMIA',
    iconName: 'briefcase',
    title:
      'Employer Compliance & LMIA Navigation: Pathways for High-Wage, Global Talent, and Intra-Company Transferees',
    excerpt:
      'Essential guidance for Canadian employers and international professionals on Labour Market Impact Assessments (LMIA), prevailing wage calculations, and compliance audits.',
    publishedAt: '2026-08-14T09:15:00.000Z',
    authorName: 'Nazly Sunguroglu, RCIC',
    authorRole: 'Regulated Canadian Immigration Consultant',
    authorOversightIcon: 'briefcase',
    authorOversightTitle: 'Author Oversight',
    authorOversightSubtitle: 'CICC Licensed #R533968',
    authorOversightText:
      'Every insight is reviewed under the direct supervision of Nazly Sunguroglu, RCIC, founder of Elvin Ediz Immigration Services in Toronto.',
    authorOversightCtaText: 'Consult on LMIA & Work Permits',
  },
  {
    _id: 'post-insight-spousal-sponsorship-inland-vs-outland',
    slug: 'spousal-sponsorship-inland-vs-outland-strategic-guide',
    kind: 'insight',
    category: 'Family & Spousal Sponsorship',
    iconName: 'heart',
    title:
      'Deconstructing Spousal Sponsorship: Inland vs. Outland Streams, Dual Intent, and Open Work Permits',
    excerpt:
      'A strategic comparison of Inland and Outland family sponsorship routes, covering open work permit eligibility, travel restrictions, and evidentiary milestones.',
    publishedAt: '2026-08-10T16:45:00.000Z',
    authorName: 'Nazly Sunguroglu, RCIC',
    authorRole: 'Regulated Canadian Immigration Consultant',
    authorOversightIcon: 'heart',
    authorOversightTitle: 'Author Oversight',
    authorOversightSubtitle: 'CICC Licensed #R533968',
    authorOversightText:
      'Every insight is reviewed under the direct supervision of Nazly Sunguroglu, RCIC, founder of Elvin Ediz Immigration Services in Toronto.',
    authorOversightCtaText: 'Consult on Spousal Sponsorship',
  },
  {
    _id: 'post-insight-pnp-strategies-ontario-bc-alberta',
    slug: 'pnp-strategies-ontario-bc-alberta-nominations',
    kind: 'insight',
    category: 'Provincial Nominee (PNP)',
    iconName: 'map-pin',
    title:
      'Unlocking Provincial Nominee Programs: Strategic Pathways across Ontario (OINP), BC PNP, and Alberta',
    excerpt:
      'How provincial nomination streams offer 600-point Comprehensive Ranking System (CRS) advantages, targeted tech and healthcare draws, and regional settlement pathways across Canada.',
    publishedAt: '2026-08-06T13:20:00.000Z',
    authorName: 'Nazly Sunguroglu, RCIC',
    authorRole: 'Regulated Canadian Immigration Consultant',
    authorOversightIcon: 'map-pin',
    authorOversightTitle: 'Author Oversight',
    authorOversightSubtitle: 'CICC Licensed #R533968',
    authorOversightText:
      'Every insight is reviewed under the direct supervision of Nazly Sunguroglu, RCIC, founder of Elvin Ediz Immigration Services in Toronto.',
    authorOversightCtaText: 'Consult on PNP Streams',
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

export const backupFaqPage = {
  eyebrow: 'COMMON QUESTIONS',
  titleMain: 'Clear answers for',
  titleAccent: 'the road ahead.',
  description: 'Every immigration path is different. These answers offer a helpful place to begin.',
  items: [
    {
      _key: 'pathway',
      question: 'How do I know which immigration pathway is right for me?',
      category: 'General',
      answer: [
        {
          _type: 'block',
          _key: 'b1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'Each situation is unique. A consultation helps identify the most relevant options, the information to prepare, and the right next step for your circumstances based on factors like education, language scores, work history, and Canadian ties.',
            },
          ],
        },
      ],
    },
    {
      _key: 'study',
      question: 'Can I study and work in Canada?',
      category: 'Study Permits',
      answer: [
        {
          _type: 'block',
          _key: 'b2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 's2',
              text: 'Yes, international students holding a valid study permit at a Designated Learning Institution (DLI) can typically work on or off campus within authorized weekly hourly limits during academic sessions, and full-time during scheduled breaks.',
            },
          ],
        },
      ],
    },
    {
      _key: 'pr-process',
      question: 'What is the processing time for Canadian Permanent Residency?',
      category: 'Permanent Residency',
      answer: [
        {
          _type: 'block',
          _key: 'b3',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 's3',
              text: 'Processing times vary by category (Express Entry, Provincial Nominees, Family Sponsorship). We evaluate your profile to choose the fastest viable stream and prepare a clean, audit-ready application.',
            },
          ],
        },
      ],
    },
    {
      _key: 'consultation',
      question: 'What happens during an initial consultation with Nazly (RCIC)?',
      category: 'Consultation',
      answer: [
        {
          _type: 'block',
          _key: 'b4',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 's4',
              text: 'We conduct a comprehensive review of your profile, career objectives, and documentation. You receive legal pathways, realistic timelines, government fee breakdowns, and a step-by-step roadmap.',
            },
          ],
        },
      ],
    },
  ],
  ctaEyebrow: 'STILL HAVE QUESTIONS?',
  ctaTitle: 'Need personalized advice on your Canadian immigration case?',
  ctaDescription:
    'Schedule a 1-on-1 consultation with Nazly Sunguroglu, RCIC to evaluate your eligibility, documents, and options.',
  ctaButtonText: 'Book Consultation',
  ctaButtonLink: '',
};

export const backupPrivacyPage = {
  eyebrow: 'LEGAL & CONFIDENTIALITY',
  titleMain: 'Privacy',
  titleAccent: 'Policy',
  description:
    'How Elvin Ediz Immigration Services protects, handles, and safeguards your personal information.',
  commitmentTitle: 'Commitment to Client Confidentiality',
  commitmentText:
    'At Elvin Ediz Immigration Services, led by Nazly Sunguroglu, RCIC (Regulated Canadian Immigration Consultant), protecting your privacy and upholding the highest professional standards of the College of Immigration and Citizenship Consultants (CICC) is fundamental to our practice.',
  content: [
    {
      _type: 'block',
      _key: 'p1',
      style: 'h3',
      children: [{ _type: 'span', _key: 's1', text: '1. Information We Collect' }],
    },
    {
      _type: 'block',
      _key: 'p2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's2',
          text: 'When you submit an assessment inquiry, schedule a consultation, or contact us through our website, we may collect personal information including:',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'p3',
      listItem: 'bullet',
      children: [
        { _type: 'span', _key: 's3', text: 'Your full name, email address, and phone number.' },
      ],
    },
    {
      _type: 'block',
      _key: 'p4',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          _key: 's4',
          text: 'Immigration history, educational background, work experience, and language proficiency scores.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'p5',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          _key: 's5',
          text: 'Specific case details and questions you provide to help assess your Canadian immigration eligibility.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'p6',
      style: 'h3',
      children: [{ _type: 'span', _key: 's6', text: '2. How We Use Your Information' }],
    },
    {
      _type: 'block',
      _key: 'p7',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's7',
          text: 'The information you provide is used exclusively to evaluate your qualifications for Canadian temporary or permanent residency pathways, schedule and conduct consultations, and comply with CICC regulatory standards.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'p8',
      style: 'h3',
      children: [{ _type: 'span', _key: 's8', text: '3. Confidentiality & Non-Disclosure' }],
    },
    {
      _type: 'block',
      _key: 'p9',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's9',
          text: 'We do not sell, rent, trade, or share your personal information with third-party advertisers or marketing agencies. Information is strictly shared only with authorized staff and legal consultants directly involved in your representation, or where required by Canadian law.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'p10',
      style: 'h3',
      children: [{ _type: 'span', _key: 's10', text: '4. Data Security & Storage' }],
    },
    {
      _type: 'block',
      _key: 'p11',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's11',
          text: 'We implement industry-standard administrative, technical, and physical safeguards to prevent unauthorized access, disclosure, alteration, or misuse of your personal data. All form submissions and communications are encrypted in transit.',
        },
      ],
    },
  ],
  inquiryTitle: '5. Privacy Inquiries & Contact',
  inquiryDescription:
    'If you have questions regarding this Privacy Policy or wish to review, update, or request the deletion of your personal information, please reach out to us:',
  companyName: 'Elvin Ediz Immigration Advisory',
  email: 'info@elvinediz.com',
  phone: '+1 (437) 772-2349',
  address: 'Toronto, Ontario, Canada',
};

export const backupAboutPage: AboutPageData = {
  eyebrow: 'ABOUT ELVIN EDIZ',
  titleMain: 'Your Trusted Partner in',
  titleAccent: 'Canadian Immigration.',
  description:
    'Founded on transparency, integrity, and RCIC-regulated expertise, we provide personalized guidance to help individuals, professionals, and families navigate Canadian immigration regulations with confidence.',

  // 02. Who We Are
  whoAreWeEyebrow: 'WHO ARE WE?',
  whoAreWeTitle: 'Elvin Ediz Immigration Services',
  whoAreWeParagraph1:
    'Elvin Ediz Immigration Services is a Toronto-based Canadian immigration firm led by Nazly Sunguroglu, RCIC (Regulated Canadian Immigration Consultant). We provide structured, end-to-end guidance across economic immigration, study pathways, work permits, family sponsorship, and citizenship.',
  whoAreWeParagraph2:
    'Every profile is assessed with direct oversight from an RCIC, ensuring your submission meets current IRCC criteria and minimizes avoidable processing delays.',
  whoAreWePrimaryCtaText: 'Free Consultation',
  whoAreWePrimaryCtaLink: '',
  whoAreWeSecondaryCtaText: 'Send a Message',
  whoAreWeSecondaryCtaLink: '#contact',
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

  // 03. Strategy & Leadership
  strategyEyebrow: 'ELVIN EDIZ IMMIGRATION SERVICES',
  strategyTitleMain: 'Our',
  strategyTitleAccent: 'Strategy',
  strategyLeaderName: 'Nazly Sunguroglu (RCIC)',
  strategyLeaderRole: 'Regulated Canadian Immigration Consultant',
  strategyLeaderSubtitle: 'Founder of Elvin Ediz Immigration Services',
  strategyQuoteParagraph:
    'We believe Canadian immigration should be empowering, not overwhelming.',
  strategyBodyParagraph:
    'With personalized assessment and clear strategic direction, we help individuals, students, professionals, and families navigate Canadian immigration regulations with confidence.',
  credentials: [
    'CICC Licensed & Active Member #R533968',
    'CAPIC (Canadian Association of Professional Immigration Consultants)',
    'Authorized IRCC Representation Across All Canadian Provinces',
    'End-to-End File Audit & Direct Client Communication',
  ],
  strategyCtaText: 'Free Consultation',
  strategyCtaLink: '',

  // 04. Process (How It Works)
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

  // 05. Consultation Callout
  ctaEyebrow: 'START YOUR JOURNEY',
  ctaTitleMain: 'Ready to discuss your Canadian',
  ctaTitleAccent: 'immigration goals?',
  ctaDescription:
    'Book a strategic consultation with Nazly Sunguroglu, RCIC to evaluate your eligibility, understand current IRCC processing, and chart your optimal pathway.',
  ctaButtonText: 'Book Free Consultation',
  ctaButtonLink: '',
};
