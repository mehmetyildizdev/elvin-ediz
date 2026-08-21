import type { FaqPageData } from '@/sanity/lib/types';

export const backupFaqPage: FaqPageData = {
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

export const defaultFaqPage = backupFaqPage;
