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

async function seedServicesPage() {
  const doc = {
    _id: 'servicesPage',
    _type: 'servicesPage',
    eyebrow: 'HOW WE CAN HELP',
    titleMain: 'A pathway built',
    titleAccent: 'around you.',
    description:
      'Personalized Canadian immigration guidance for the next chapter you are ready to build.',
  };

  console.log('🚀 Creating servicesPage document in Sanity...');
  const res = await client.createIfNotExists(doc);
  console.log('✅ Successfully created/ensured servicesPage document:', res._id);
}

seedServicesPage().catch(console.error);
