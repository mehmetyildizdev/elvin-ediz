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

async function seedChecklistSteps() {
  console.log(`Updating Checklist Steps labels in Sanity dataset "${dataset}"...`);

  const existingDocs = await client.fetch('*[_type == "insightsPage"]');

  if (existingDocs.length === 0) {
    console.log('No insightsPage document found.');
    return;
  }

  for (const doc of existingDocs) {
    const isTr = doc.language === 'tr';

    const patch = client.patch(doc._id).setIfMissing({
      infoChecklistStepText: isTr ? 'Kontrol Adımı' : 'Checklist Step',
      infoChecklistStepsText: isTr ? 'Kontrol Maddesi' : 'Checklist Steps',
    });

    await patch.commit();
    console.log(`Updated checklist steps fields on document ${doc._id} (${doc.language || 'en'})`);
  }

  console.log('Checklist steps seed complete!');
}

seedChecklistSteps().catch((err) => {
  console.error('Error seeding checklist steps:', err);
  process.exit(1);
});
