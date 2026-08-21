import { createClient } from '@sanity/client';
import fs from 'fs';

// Read .env.local manually if present
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

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_EDITOR_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error('Error: SANITY_PROJECT_ID is missing in environment');
  process.exit(1);
}

if (!token) {
  console.error('Error: SANITY_EDITOR_TOKEN / SANITY_API_WRITE_TOKEN is missing');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-07-14',
  useCdn: false,
});

const defaultFooterDataEn = {
  footerDescription:
    'Guidance for your next chapter in Canada. Personal, regulated Canadian immigration consulting.',
  footerNavTitle: 'Explore',
  footerNav: [
    { _key: 'fn1', label: 'Home', href: '/' },
    { _key: 'fn2', label: 'Services', href: '/services' },
    { _key: 'fn3', label: 'Insights', href: '/insights' },
    { _key: 'fn4', label: 'Q&A', href: '/questions' },
    { _key: 'fn5', label: 'Privacy Policy', href: '/privacy' },
  ],
  footerConnectTitle: 'Connect',
  footerConsultationText: 'Free Consultation',
  footerPrivacyText: 'Privacy Policy',
  footerNotice: 'Regulated Canadian Immigration Consultant (RCIC)',
  copyrightText: `© ${new Date().getFullYear()} Elvin Ediz Immigration Services. All rights reserved.`,
};

const defaultFooterDataTr = {
  footerDescription:
    'Kanada’daki yeni sayfanız için rehberlik. Kişiselleştirilmiş, regüle edilmiş Kanada göçmenlik danışmanlığı.',
  footerNavTitle: 'Keşfedin',
  footerNav: [
    { _key: 'fn1', label: 'Ana Sayfa', href: '/' },
    { _key: 'fn2', label: 'Hizmetler', href: '/services' },
    { _key: 'fn3', label: 'İçgörüler', href: '/insights' },
    { _key: 'fn4', label: 'Soru & Cevap', href: '/questions' },
    { _key: 'fn5', label: 'Gizlilik Politikası', href: '/privacy' },
  ],
  footerConnectTitle: 'İletişim',
  footerConsultationText: 'Ücretsiz Danışmanlık',
  footerPrivacyText: 'Gizlilik Politikası',
  footerNotice: 'Regulated Canadian Immigration Consultant (RCIC)',
  copyrightText: `© ${new Date().getFullYear()} Elvin Ediz Immigration Services. Tüm hakları saklıdır.`,
};

async function seedFooter() {
  console.log(`Updating Footer fields in Sanity dataset "${dataset}"...`);

  const existingDocs = await client.fetch('*[_type == "siteSettings"]');

  if (existingDocs.length === 0) {
    console.log('No siteSettings document found. Creating default siteSettings...');
    await client.createIfNotExists({
      _id: 'siteSettings',
      _type: 'siteSettings',
      siteTitle: 'Elvin Ediz Immigration Services',
      contactEmail: 'info@elvinediz.com',
      phone: '(647) 568 1009',
      officeHours: 'Mon - Fri: 09:00am - 4:00pm',
      address: 'Toronto, Ontario, Canada',
      consultationLink: '/contact',
      whatsappNumber: '123456789',
      linkedinUrl: 'https://www.linkedin.com/in/nazly-sunguroglu-31574455/',
      instagramUrl: 'https://www.instagram.com/elvinedizimmigration/',
      headerNav: [
        { _key: 'n1', label: 'Home', href: '/' },
        { _key: 'n2', label: 'Services', href: '/services' },
        { _key: 'n3', label: 'Insights', href: '/insights' },
        { _key: 'n4', label: 'Q&A', href: '/questions' },
        { _key: 'n5', label: 'Contact', href: '/contact' },
      ],
      ...defaultFooterDataEn,
    });
    console.log('Created siteSettings document with footer fields.');
    return;
  }

  for (const doc of existingDocs) {
    const isTr = doc.language === 'tr';
    const defaults = isTr ? defaultFooterDataTr : defaultFooterDataEn;

    const patch = client.patch(doc._id).setIfMissing({
      footerDescription: defaults.footerDescription,
      footerNavTitle: defaults.footerNavTitle,
      footerNav: defaults.footerNav,
      footerConnectTitle: defaults.footerConnectTitle,
      footerConsultationText: defaults.footerConsultationText,
      footerPrivacyText: defaults.footerPrivacyText,
    });

    await patch.commit();
    console.log(`Updated footer fields on document ${doc._id} (${doc.language || 'en'})`);
  }

  console.log('Footer seed complete!');
}

seedFooter().catch((err) => {
  console.error('Error seeding footer:', err);
  process.exit(1);
});
