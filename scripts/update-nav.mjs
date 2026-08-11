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

async function updateNav() {
  console.log('Updating Sanity CMS siteSettings headerNav to include Home and remove About...');

  await client.patch('siteSettings')
    .set({
      headerNav: [
        { _key: 'n1', label: 'Home', href: '/' },
        { _key: 'n2', label: 'Services', href: '/services' },
        { _key: 'n3', label: 'Insights', href: '/insights' },
        { _key: 'n4', label: 'Q&A', href: '/questions' },
        { _key: 'n5', label: 'Contact', href: '/contact' },
      ],
    })
    .commit();

  console.log('✓ Successfully updated siteSettings in Sanity CMS!');
}

updateNav().catch((err) => {
  console.error('❌ Failed to update Sanity CMS nav:', err);
  process.exit(1);
});
