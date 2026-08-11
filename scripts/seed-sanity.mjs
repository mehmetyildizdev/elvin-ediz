import { createClient } from '@sanity/client';
import fs from 'fs';

// Read .env.local manually
if (fs.existsSync('.env.local')) {
  const envConfig = fs.readFileSync('.env.local', 'utf8');
  for (const line of envConfig.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...valueParts] = trimmed.split('=');
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_EDITOR_TOKEN;

if (!projectId) {
  console.error('Error: SANITY_PROJECT_ID is missing in environment');
  process.exit(1);
}

if (!token) {
  console.error('Error: SANITY_EDITOR_TOKEN is missing in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-07-14',
  useCdn: false,
});

async function seed() {
  console.log(`Seeding Sanity CMS dataset "${dataset}" in project "${projectId}"...`);

  // 1. Site Settings Singleton
  const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
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
      { _key: 'n1', label: 'Home', href: '/' },
      { _key: 'n2', label: 'Services', href: '/services' },
      { _key: 'n3', label: 'Insights', href: '/insights' },
      { _key: 'n4', label: 'Q&A', href: '/questions' },
      { _key: 'n5', label: 'Contact', href: '/contact' },
    ],
    footerNotice: 'Regulated Canadian Immigration Consultant (RCIC)',
    copyrightText: `© ${new Date().getFullYear()} Elvin Ediz Immigration Services. All rights reserved.`,
  };

  // 2. HomePage Singleton
  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    heroEyebrow: 'ELVIN EDIZ IMMIGRATION SERVICES',
    heroTitle: 'Your Canadian story. starts here.',
    heroSubtitle:
      'Clear, compassionate, and regulated Canadian immigration guidance tailored to the life you are ready to build in Canada.',
    heroPrimaryCtaText: 'Free Consultation',
    heroPrimaryCtaLink: 'https://wa.me/16475681009',
    heroSecondaryCtaText: 'Explore services',
    badgeText: 'EST. 2018',
    stats: [
      { _key: 's1', number: '4,578+', label: 'Trusted Clients' },
      { _key: 's2', number: '150+', label: 'Countries Represented' },
      { _key: 's3', number: '574+', label: 'Partner Universities' },
      { _key: 's4', number: '1,564+', label: 'Student Permits' },
      { _key: 's5', number: '1,254+', label: 'Successful Immigrations' },
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

  // 3. Staff Member (Nazly Sunguroglu)
  const staffNazly = {
    _id: 'staff-nazly',
    _type: 'staffMember',
    name: 'Nazly Sunguroglu',
    designation: 'RCIC',
    role: 'Regulated Canadian Immigration Consultant',
    subtitle: 'Founder of Elvin Ediz Immigration Services',
    email: 'info@elvinediz.com',
    order: 1,
    bio: `Elvin Ediz Immigration Services believes every individual is unique with a one-of-a-kind goal in life.

Our personalized approach believes that Pragmatism is the key to handling your case. Considering your circumstances will maximize the effectiveness of your application when you engage with our legal team, you will know your rights and options, if you qualify for a specific program, and the chances of a successful case.`,
  };

  // 4. Services (5 Pathways)
  const services = [
    {
      _id: 'srv-visitor',
      _type: 'service',
      title: 'Visitor Visa',
      slug: { _type: 'slug', current: 'visitor-visa' },
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
      _type: 'service',
      title: 'Temporary Residency',
      slug: { _type: 'slug', current: 'temporary-residency' },
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
      _type: 'service',
      title: 'Permanent Residency',
      slug: { _type: 'slug', current: 'permanent-residency' },
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
      _type: 'service',
      title: 'Start-Up Visa Program',
      slug: { _type: 'slug', current: 'start-up-visa-program' },
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
      _type: 'service',
      title: 'LMIA (Labour Market Assessment)',
      slug: { _type: 'slug', current: 'lmia' },
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

  // 5. Testimonials (5 Google Reviews)
  const testimonials = [
    {
      _id: 't-1',
      _type: 'testimonial',
      author: 'Ertan Sokmen',
      location: 'France',
      rating: 5,
      quote:
        'I am extremely impressed with the professionalism and expertise Ms. Nazly brought to my case. Once Ms. Nazly took over, everything moved forward smoothly and efficiently.',
    },
    {
      _id: 't-2',
      _type: 'testimonial',
      author: 'Sarah D',
      location: 'Toronto, ON',
      rating: 5,
      quote:
        'We applied for my mother. During this time, everything was very easy and our visa was approved. The questions were answered as soon as possible and necessary guidance given on time.',
    },
    {
      _id: 't-3',
      _type: 'testimonial',
      author: 'Aysen Gunerli',
      location: 'Canada',
      rating: 5,
      quote:
        'Working with Nazlı was a wonderful experience. We proceeded very professionally and clearly at every stage. I could easily reach her whenever I needed.',
    },
    {
      _id: 't-4',
      _type: 'testimonial',
      author: 'Ben C.',
      location: 'Canada',
      rating: 5,
      quote:
        "I used Elvin Ediz Immigration Services for my parents' visa application. Nazly handled everything smoothly and made the process much easier for us.",
    },
    {
      _id: 't-5',
      _type: 'testimonial',
      author: 'JD',
      location: 'Toronto, ON',
      rating: 5,
      quote:
        'Nazli is super kind, helpful, and always easy to reach. This made the whole visa process so much less stressful. I’d highly recommend her to anyone!',
    },
  ];

  // 6. FAQ Singleton
  const faqPage = {
    _id: 'faqPage',
    _type: 'faqPage',
    title: 'Common Questions & Answers',
    items: [
      {
        _key: 'pathway',
        question: 'How do I know which immigration pathway is right for me?',
        answer:
          'Each situation is unique. A consultation helps identify the most relevant options, the information to prepare, and the right next step for your circumstances.',
      },
      {
        _key: 'study',
        question: 'Can I study and work in Canada?',
        answer:
          'Your eligibility and conditions depend on your individual circumstances and current official IRCC requirements.',
      },
      {
        _key: 'pr-process',
        question: 'What is the processing time for Canadian Permanent Residency?',
        answer:
          'Processing times vary by category (Express Entry, Provincial Nominees, Family Sponsorship). We evaluate your eligibility to choose the fastest viable stream.',
      },
      {
        _key: 'consultation',
        question: 'What happens during an initial consultation with Nazly (RCIC)?',
        answer:
          'We review your profile, goals, work experience, and educational background to present legal options, required documents, and a structured timeline.',
      },
    ],
  };

  const docs = [siteSettings, homePage, staffNazly, ...services, ...testimonials, faqPage];

  for (const doc of docs) {
    await client.createOrReplace(doc);
    console.log(`✓ Published document: [${doc._type}] ID: "${doc._id}"`);
  }

  console.log('🎉 Sanity CMS seeding completed successfully!');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
