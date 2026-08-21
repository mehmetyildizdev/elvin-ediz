import type { AboutPageData } from '@/sanity/lib/types';

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
  strategyQuoteParagraph: 'We believe Canadian immigration should be empowering, not overwhelming.',
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

export const defaultAboutPage = backupAboutPage;
