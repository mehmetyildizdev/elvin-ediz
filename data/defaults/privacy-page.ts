import type { PrivacyPageData } from '@/sanity/lib/types';

export const backupPrivacyPage: PrivacyPageData = {
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

export const defaultPrivacyPage = backupPrivacyPage;
