import {
  SiteSettingsData,
  HomePageData,
  StaffData,
  ServiceData,
  TestimonialData,
} from './data';

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
  heroEyebrow: 'ELVIN EDIZ IMMIGRATION SERVICES',
  heroTitle: 'Your Canadian story. starts here.',
  heroSubtitle:
    'Clear, compassionate, and regulated Canadian immigration guidance tailored to the life you are ready to build in Canada.',
  heroPrimaryCtaText: 'Free Consultation',
  heroPrimaryCtaLink: 'https://wa.me/16475681009',
  heroSecondaryCtaText: 'Explore services',
  badgeText: 'EST. 2018',
  stats: [
    { number: '4,578+', label: 'Trusted Clients' },
    { number: '150+', label: 'Countries Represented' },
    { number: '574+', label: 'Partner Universities' },
    { number: '1,564+', label: 'Student Permits' },
    { number: '1,254+', label: 'Successful Immigrations' },
  ],
  strategyEyebrow: 'ELVIN EDIZ IMMIGRATION SERVICES',
  strategyTitle: 'Our Strategy',
  strategyParagraph1:
    'Elvin Ediz Immigration Services believes every individual is unique with a one-of-a-kind goal in life.',
  strategyParagraph2:
    'Our personalized approach believes that Pragmatism is the key to handling your case. Considering your circumstances will maximize the effectiveness of your application when you engage with our legal team, you will know your rights and options, if you qualify for a specific program, and the chances of a successful case.',
  calloutEyebrow: 'NOT SURE WHERE TO BEGIN?',
  calloutTitle: 'We can find the right starting point.',
  calloutCtaText: 'Free Consultation',
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
