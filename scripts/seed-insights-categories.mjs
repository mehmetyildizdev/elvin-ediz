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

const defaultCategoryNavEn = {
  categoryNavLabel: 'Browse By Category:',
  categoryInsightsLabel: 'Featured Insights',
  categoryGuidesLabel: 'Practical Guides',
  categoryAnnouncementsLabel: 'Official Notices',
  categoryNewsLabel: 'Immigration News',
  categoryQaPrompt: 'Have a specific question? Visit Q&A →',
};

const defaultCategoryNavTr = {
  categoryNavLabel: 'Kategoriye Göre Gözat:',
  categoryInsightsLabel: 'Öne Çıkan İçgörüler',
  categoryGuidesLabel: 'Pratik Rehberler',
  categoryAnnouncementsLabel: 'Resmi Duyurular',
  categoryNewsLabel: 'Göçmenlik Haberleri',
  categoryQaPrompt: 'Sorunuz mu var? Soru & Cevap sayfasına göz atın →',
};

async function seedInsightsCategories() {
  console.log(`Updating Category Navigation fields in Sanity dataset "${dataset}"...`);

  const existingDocs = await client.fetch('*[_type == "insightsPage"]');

  if (existingDocs.length === 0) {
    console.log('No insightsPage document found.');
    return;
  }

  for (const doc of existingDocs) {
    const isTr = doc.language === 'tr';
    const defaults = isTr ? defaultCategoryNavTr : defaultCategoryNavEn;

    const patch = client.patch(doc._id).setIfMissing({
      categoryNavLabel: defaults.categoryNavLabel,
      categoryInsightsLabel: defaults.categoryInsightsLabel,
      categoryGuidesLabel: defaults.categoryGuidesLabel,
      categoryAnnouncementsLabel: defaults.categoryAnnouncementsLabel,
      categoryNewsLabel: defaults.categoryNewsLabel,
      categoryQaPrompt: defaults.categoryQaPrompt,
    });

    await patch.commit();
    console.log(`Updated category nav fields on document ${doc._id} (${doc.language || 'en'})`);
  }

  console.log('Category navigation seed complete!');
}

seedInsightsCategories().catch((err) => {
  console.error('Error seeding insights categories:', err);
  process.exit(1);
});
