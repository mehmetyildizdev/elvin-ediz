import { createClient } from '@sanity/client';
import fs from 'fs';

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

if (!projectId || !token) {
  console.error('Error: Project ID or Token missing');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-07-14',
  useCdn: false,
});

const enHeaderNav = [
  { _key: 'nav-home', label: 'Home', href: '/' },
  { _key: 'nav-about', label: 'About', href: '/about' },
  { _key: 'nav-services', label: 'Services', href: '/services' },
  { _key: 'nav-insights', label: 'Insights', href: '/insights' },
  { _key: 'nav-qa', label: 'Q&A', href: '/questions' },
  { _key: 'nav-contact', label: 'Contact', href: '/contact' },
];

const enFooterNav = [
  { _key: 'fnav-home', label: 'Home', href: '/' },
  { _key: 'fnav-about', label: 'About', href: '/about' },
  { _key: 'fnav-services', label: 'Services', href: '/services' },
  { _key: 'fnav-insights', label: 'Insights', href: '/insights' },
  { _key: 'fnav-qa', label: 'Q&A', href: '/questions' },
  { _key: 'fnav-privacy', label: 'Privacy Policy', href: '/privacy' },
];

const trHeaderNav = [
  { _key: 'tr-nav-home', label: 'Ana Sayfa', href: '/' },
  { _key: 'tr-nav-about', label: 'Hakkımızda', href: '/about' },
  { _key: 'tr-nav-services', label: 'Hizmetler', href: '/services' },
  { _key: 'tr-nav-insights', label: 'Yazılar', href: '/insights' },
  { _key: 'tr-nav-qa', label: 'S.S.S.', href: '/questions' },
  { _key: 'tr-nav-contact', label: 'İletişim', href: '/contact' },
];

const trFooterNav = [
  { _key: 'tr-fnav-home', label: 'Ana Sayfa', href: '/' },
  { _key: 'tr-fnav-about', label: 'Hakkımızda', href: '/about' },
  { _key: 'tr-fnav-services', label: 'Hizmetler', href: '/services' },
  { _key: 'tr-fnav-insights', label: 'Yazılar', href: '/insights' },
  { _key: 'tr-fnav-qa', label: 'S.S.S.', href: '/questions' },
  { _key: 'tr-fnav-privacy', label: 'Gizlilik Politikası', href: '/privacy' },
];

async function updateNavigation() {
  console.log('Updating siteSettings navigation with About page...');

  // Update English siteSettings
  const enSettings = await client.fetch(`*[_type == "siteSettings" && (language == "en" || !defined(language))][0]._id`);
  if (enSettings) {
    await client.patch(enSettings).set({ headerNav: enHeaderNav, footerNav: enFooterNav }).commit();
    console.log(`Updated English siteSettings document (${enSettings})`);
  }

  // Update Turkish siteSettings
  const trSettings = await client.fetch(`*[_type == "siteSettings" && language == "tr"][0]._id`);
  if (trSettings) {
    await client.patch(trSettings).set({ headerNav: trHeaderNav, footerNav: trFooterNav }).commit();
    console.log(`Updated Turkish siteSettings document (${trSettings})`);
  }

  console.log('Navigation update complete!');
}

updateNavigation().catch((err) => {
  console.error('Error updating navigation:', err);
  process.exit(1);
});
