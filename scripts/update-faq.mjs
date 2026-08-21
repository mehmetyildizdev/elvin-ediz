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
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_EDITOR_TOKEN;

if (!projectId || !token) {
  console.error('Missing projectId or token');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-07-14',
  useCdn: false,
});

async function updateFaq() {
  console.log('Updating faqPage document in Sanity...');
  const patchData = {
    eyebrow: 'COMMON QUESTIONS',
    titleMain: 'Clear answers for',
    titleAccent: 'the road ahead.',
    description:
      'Every immigration path is different. These answers offer a helpful place to begin.',
    ctaEyebrow: 'STILL HAVE QUESTIONS?',
    ctaTitle: 'Need personalized advice on your Canadian immigration case?',
    ctaDescription:
      'Schedule a 1-on-1 consultation with Nazly Sunguroglu, RCIC to evaluate your eligibility, documents, and options.',
    ctaButtonText: 'Book Consultation',
    ctaButtonLink: '',
  };

  await client.patch('faqPage').set(patchData).commit();

  console.log('Successfully updated faqPage document in Sanity!');
}

updateFaq().catch((err) => {
  console.error('Error updating faqPage:', err);
  process.exit(1);
});
