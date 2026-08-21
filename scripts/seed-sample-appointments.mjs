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

async function seedSampleAppointments() {
  console.log('Seeding sample appointments to Sanity dataset...');

  const sample1 = {
    _id: 'appointment-sample-1',
    _type: 'appointment',
    name: 'Alexander Wright',
    email: 'alexander.wright@example.com',
    phone: '+1 (647) 819-2041',
    service: 'Express Entry & PNP',
    message:
      'I am a senior software engineer with 4 years of experience. Looking to evaluate my CRS score and provincial nominee options for Ontario or British Columbia.',
    status: 'New',
    receivedAt: new Date().toISOString(),
  };

  const sample2 = {
    _id: 'appointment-sample-2',
    _type: 'appointment',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (416) 555-0193',
    service: 'Study Permit & PGWP',
    message:
      'Accepted into a Master program in Toronto starting this fall. Need assistance with my study permit documentation and spousal open work permit.',
    status: 'Contacted',
    receivedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  };

  await client.createOrReplace(sample1);
  await client.createOrReplace(sample2);

  console.log('Successfully created 2 sample appointments in Sanity Studio!');
}

seedSampleAppointments().catch((err) => {
  console.error('Error seeding sample appointments:', err);
  process.exit(1);
});
