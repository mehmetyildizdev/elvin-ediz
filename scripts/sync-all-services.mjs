import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  });
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-07-14',
  useCdn: false,
  token: process.env.SANITY_EDITOR_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
});

export const servicesData = [
  // 1. Visitor Visa (already done, kept complete)
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
        children: [{ _key: 'b1-s', _type: 'span', marks: [], text: 'Overview of Canadian Visitor Visa (TRV)' }],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [
          { _key: 'b2-s1', _type: 'span', marks: [], text: 'A ' },
          { _key: 'b2-s2', _type: 'span', marks: ['strong'], text: 'Visitor Visa (Temporary Resident Visa)' },
          {
            _key: 'b2-s3',
            _type: 'span',
            marks: [],
            text: ' is an official document issued by Immigration, Refugees and Citizenship Canada (IRCC) that allows foreign nationals to enter Canada for a short stay, usually up to ',
          },
          { _key: 'b2-s4', _type: 'span', marks: ['strong'], text: 'six months' },
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
          { _key: 'b3-s1', _type: 'span', marks: ['strong'], text: 'Important Rule: ' },
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
        children: [{ _key: 'b4-s', _type: 'span', marks: [], text: 'Available Visitor Visa Streams' }],
      },
      {
        _key: 'b5',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'b5-s1', _type: 'span', marks: ['strong'], text: 'Family Visit Visa: ' },
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
          { _key: 'b6-s1', _type: 'span', marks: ['strong'], text: 'Business Visit Visa: ' },
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
          { _key: 'b7-s1', _type: 'span', marks: ['strong'], text: 'Medical Visit (Treatment / Consultation) Visa: ' },
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
          { _key: 'b8-s1', _type: 'span', marks: ['strong'], text: 'General Tourism Visa: ' },
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
        children: [{ _key: 'b9-s', _type: 'span', marks: [], text: 'Temporary Resident Status' }],
      },
      {
        _key: 'b10',
        _type: 'block',
        style: 'normal',
        children: [
          { _key: 'b10-s1', _type: 'span', marks: ['strong'], text: 'Temporary Resident Status' },
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

  // 2. Temporary Residency
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
        children: [{ _key: 'tr-b1-s', _type: 'span', marks: [], text: 'Temporary Resident Status in Canada' }],
      },
      {
        _key: 'tr-b2',
        _type: 'block',
        style: 'normal',
        children: [
          { _key: 'tr-b2-s1', _type: 'span', marks: ['strong'], text: 'Temporary Resident Status' },
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
        children: [{ _key: 'tr-b3-s', _type: 'span', marks: [], text: 'Types of Residency Status in Canada' }],
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
          { _key: 'tr-b5-s1', _type: 'span', marks: ['strong'], text: 'Open Work Permit: ' },
          { _key: 'tr-b5-s2', _type: 'span', marks: [], text: 'You can work for almost any Canadian employer without industry or geographical restrictions.' },
        ],
      },
      {
        _key: 'tr-b6',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'tr-b6-s1', _type: 'span', marks: ['strong'], text: 'Employer Specific Work Permit: ' },
          { _key: 'tr-b6-s2', _type: 'span', marks: [], text: 'Work for a designated Canadian employer who holds a positive LMIA or LMIA-exempt approval.' },
        ],
      },
      {
        _key: 'tr-b7',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'tr-b7-s1', _type: 'span', marks: ['strong'], text: 'Study Permit Holder: ' },
          { _key: 'tr-b7-s2', _type: 'span', marks: [], text: 'Authorized enrollment at recognized Designated Learning Institutions (DLIs) across Canadian provinces.' },
        ],
      },
      {
        _key: 'tr-b8',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'tr-b8-s1', _type: 'span', marks: ['strong'], text: 'Refugee / Asylum Status: ' },
          { _key: 'tr-b8-s2', _type: 'span', marks: [], text: 'Legal protection and temporary status for individuals seeking asylum and humanitarian relief.' },
        ],
      },
      {
        _key: 'tr-b9',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'tr-b9-s1', _type: 'span', marks: ['strong'], text: 'Spousal Work / Study Permit: ' },
          { _key: 'tr-b9-s2', _type: 'span', marks: [], text: 'Authorization for spouses and common-law partners of qualifying permit holders to work or study in Canada.' },
        ],
      },
      {
        _key: 'tr-b10',
        _type: 'block',
        style: 'blockquote',
        children: [
          { _key: 'tr-b10-s1', _type: 'span', marks: ['strong'], text: 'Important Notice: ' },
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

  // 3. Permanent Residency
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
        children: [{ _key: 'pr-b1-s', _type: 'span', marks: [], text: 'Permanent Residency in Canada' }],
      },
      {
        _key: 'pr-b2',
        _type: 'block',
        style: 'normal',
        children: [
          { _key: 'pr-b2-s1', _type: 'span', marks: ['strong'], text: 'Permanent Residency (PR)' },
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
        children: [{ _key: 'pr-b3-s', _type: 'span', marks: [], text: 'Permanent Residency Pathways' }],
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
          { _key: 'pr-b5-s1', _type: 'span', marks: ['strong'], text: 'Express Entry (Points-Based System): ' },
          { _key: 'pr-b5-s2', _type: 'span', marks: [], text: 'Apply from inside or outside Canada. Eligible work or study permit holders and skilled professionals can qualify if they meet the Comprehensive Ranking System (CRS) score cutoff.' },
        ],
      },
      {
        _key: 'pr-b6',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'pr-b6-s1', _type: 'span', marks: ['strong'], text: 'Family & Spousal Sponsorship: ' },
          { _key: 'pr-b6-s2', _type: 'span', marks: [], text: 'Secure permanent residency through sponsorship by a Canadian citizen or permanent resident spouse, partner, parent, or child.' },
        ],
      },
      {
        _key: 'pr-b7',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'pr-b7-s1', _type: 'span', marks: ['strong'], text: 'Start-Up Visa Program: ' },
          { _key: 'pr-b7-s2', _type: 'span', marks: [], text: 'Designed for innovative entrepreneurs—one of the fastest and most reliable direct PR pathways with a supported business idea.' },
        ],
      },
      {
        _key: 'pr-b8',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'pr-b8-s1', _type: 'span', marks: ['strong'], text: 'Refugee & Humanitarian Status: ' },
          { _key: 'pr-b8-s2', _type: 'span', marks: [], text: 'Legal recognition as a protected person or refugee provides a direct route to Canadian permanent residency.' },
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
    ctaSubtitle:
      'Direct representation and CRS points assessment with Nazly Sunguroglu, RCIC.',
    ctaButtonText: 'Start PR Assessment',
  },

  // 4. Start-Up Visa Program
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
        children: [{ _key: 'su-b1-s', _type: 'span', marks: [], text: 'What is the Start-Up Visa Program?' }],
      },
      {
        _key: 'su-b2',
        _type: 'block',
        style: 'normal',
        children: [
          { _key: 'su-b2-s1', _type: 'span', marks: ['strong'], text: 'Canada’s Start-Up Visa Program (SUV)' },
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
        children: [{ _key: 'su-b3-s', _type: 'span', marks: [], text: 'Who Can Apply?' }],
      },
      {
        _key: 'su-b4',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'su-b4-s1', _type: 'span', marks: ['strong'], text: 'Innovative Founders: ' },
          { _key: 'su-b4-s2', _type: 'span', marks: [], text: 'Entrepreneurs with a viable, innovative business concept with global scalability potential.' },
        ],
      },
      {
        _key: 'su-b5',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'su-b5-s1', _type: 'span', marks: ['strong'], text: 'Designated Organization Support: ' },
          { _key: 'su-b5-s2', _type: 'span', marks: [], text: 'A formal letter of support from an approved Venture Capital Fund, Angel Investor Group, or Business Incubator in Canada.' },
        ],
      },
      {
        _key: 'su-b6',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'su-b6-s1', _type: 'span', marks: ['strong'], text: 'Language & Settlement Funds: ' },
          { _key: 'su-b6-s2', _type: 'span', marks: [], text: 'Applicants who meet minimum language proficiency (CLB 5) and required settlement funds for relocation.' },
        ],
      },
      {
        _key: 'su-b7',
        _type: 'block',
        style: 'h3',
        children: [{ _key: 'su-b7-s', _type: 'span', marks: [], text: 'Why Choose the Start-Up Visa?' }],
      },
      {
        _key: 'su-b8',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'su-b8-s1', _type: 'span', marks: ['strong'], text: 'Direct Permanent Residency: ' },
          { _key: 'su-b8-s2', _type: 'span', marks: [], text: 'Direct pathway to Permanent Residency for you and your family members.' },
        ],
      },
      {
        _key: 'su-b9',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'su-b9-s1', _type: 'span', marks: ['strong'], text: 'Economic Stability: ' },
          { _key: 'su-b9-s2', _type: 'span', marks: [], text: 'Opportunity to build and scale your venture in one of the world’s most stable and transparent economies.' },
        ],
      },
      {
        _key: 'su-b10',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'su-b10-s1', _type: 'span', marks: ['strong'], text: 'Strong Ecosystem: ' },
          { _key: 'su-b10-s2', _type: 'span', marks: [], text: 'Access to Canada’s venture capital networks, North American trade agreements, and skilled workforce.' },
        ],
      },
      {
        _key: 'su-b11',
        _type: 'block',
        style: 'h3',
        children: [{ _key: 'su-b11-s', _type: 'span', marks: [], text: 'Comprehensive Family Benefits & Education Savings' }],
      },
      {
        _key: 'su-b12',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'su-b12-s1', _type: 'span', marks: ['strong'], text: 'Universal Healthcare: ' },
          { _key: 'su-b12-s2', _type: 'span', marks: [], text: 'Family members get full access to Canada’s public healthcare system without costly private insurance.' },
        ],
      },
      {
        _key: 'su-b13',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'su-b13-s1', _type: 'span', marks: ['strong'], text: 'Free Public Schooling for Children: ' },
          { _key: 'su-b13-s2', _type: 'span', marks: [], text: 'Children attend Canadian public primary and secondary schools for free, avoiding high international student tuition fees.' },
        ],
      },
      {
        _key: 'su-b14',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'su-b14-s1', _type: 'span', marks: ['strong'], text: 'Domestic University Tuition: ' },
          { _key: 'su-b14-s2', _type: 'span', marks: [], text: 'Access domestic tuition rates at Canadian colleges and universities (saving 2–4x compared to international student rates).' },
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

  // 5. LMIA
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
        children: [{ _key: 'lm-b1-s', _type: 'span', marks: [], text: 'What is LMIA?' }],
      },
      {
        _key: 'lm-b2',
        _type: 'block',
        style: 'normal',
        children: [
          { _key: 'lm-b2-s1', _type: 'span', marks: ['strong'], text: 'A Labour Market Impact Assessment (LMIA)' },
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
        children: [{ _key: 'lm-b4-s', _type: 'span', marks: [], text: 'Benefits of LMIA for Business Owners' }],
      },
      {
        _key: 'lm-b5',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'lm-b5-s1', _type: 'span', marks: ['strong'], text: 'Access to Skilled Talent: ' },
          { _key: 'lm-b5-s2', _type: 'span', marks: [], text: 'Hire employees with specialized skills not readily available locally and fill critical position gaps to scale operations.' },
        ],
      },
      {
        _key: 'lm-b6',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'lm-b6-s1', _type: 'span', marks: ['strong'], text: 'Business Expansion & Continuity: ' },
          { _key: 'lm-b6-s2', _type: 'span', marks: [], text: 'Quickly onboard foreign workers to support seasonal peaks, new contracts, and maintain operations without labor shortages.' },
        ],
      },
      {
        _key: 'lm-b7',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'lm-b7-s1', _type: 'span', marks: ['strong'], text: 'Pathway to Permanent Residency: ' },
          { _key: 'lm-b7-s2', _type: 'span', marks: [], text: 'Certain LMIA-supported employees can apply for permanent residency, helping retain valuable talent long-term.' },
        ],
      },
      {
        _key: 'lm-b8',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'lm-b8-s1', _type: 'span', marks: ['strong'], text: 'Flexible Hiring Options: ' },
          { _key: 'lm-b8-s2', _type: 'span', marks: [], text: 'LMIA permits hiring for full-time, seasonal, or temporary positions depending on business requirements.' },
        ],
      },
      {
        _key: 'lm-b9',
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [
          { _key: 'lm-b9-s1', _type: 'span', marks: ['strong'], text: 'Competitive Advantage: ' },
          { _key: 'lm-b9-s2', _type: 'span', marks: [], text: 'Attract international expertise and multilingual capabilities to drive innovation and business growth.' },
        ],
      },
    ],
    ctaTitle: 'Employer LMIA Consultation & Filing',
    ctaSubtitle:
      'Guiding Canadian businesses through Job Bank recruitment, ESDC submissions, and foreign worker work permits.',
    ctaButtonText: 'Schedule LMIA Consultation',
  },
];

async function syncAllServices() {
  console.log('🚀 Starting sync of all services into Sanity CMS...');

  for (const s of servicesData) {
    const patchData = {
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      order: s.order,
      iconName: s.iconName,
      summary: s.summary,
      features: s.features,
      body: s.body,
      ctaTitle: s.ctaTitle,
      ctaSubtitle: s.ctaSubtitle,
      ctaButtonText: s.ctaButtonText,
    };

    console.log(`Patching ${s._id} (${s.title})...`);
    const res = await client
      .createIfNotExists({ _id: s._id, _type: 'service', ...patchData })
      .then(() => client.patch(s._id).set(patchData).commit());
    console.log(`✅ Synced ${s._id}:`, res._id);
  }

  console.log('🎉 All 5 services successfully synced into Sanity CMS!');
}

syncAllServices().catch((err) => {
  console.error('❌ Error syncing services:', err);
  process.exit(1);
});
