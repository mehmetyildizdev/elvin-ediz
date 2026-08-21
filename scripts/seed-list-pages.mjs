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

const defaultListLayoutEn = {
  paginationPrevText: 'Prev',
  paginationNextText: 'Next',
  breadcrumbBackToHubText: 'Back to insights & updates',
  infoChecklistKeyItemsTitle: 'Key Checklist Items:',
  infoViewFullGuideActionText: 'View full guide & checklist',
  infoConsultantActionText: 'Inquire with Consultant',
  infoMorePointsText: 'more checklist points in full guide',
  announcementsEffectivePrefix: 'Effective:',
  announcementsActionTitle: 'Action Recommended:',
  announcementsViewFullActionText: 'View full notice & action steps',
  announcementsInquireActionText: 'Inquire with RCIC',
  newsFeaturedBadgeText: 'Featured News',
  newsReadActionText: 'Read',
};

const defaultListLayoutTr = {
  paginationPrevText: 'Önceki',
  paginationNextText: 'Sonraki',
  breadcrumbBackToHubText: 'Yazılar ve Güncellemelere Geri Dön',
  infoChecklistKeyItemsTitle: 'Temel Kontrol Listesi Maddeleri:',
  infoViewFullGuideActionText: 'Tam rehber ve kontrol listesini incele',
  infoConsultantActionText: 'Danışmana Danışın',
  infoMorePointsText: 'daha fazla kontrol maddesi tam rehberde',
  announcementsEffectivePrefix: 'Yürürlük:',
  announcementsActionTitle: 'Önerilen Aksiyon:',
  announcementsViewFullActionText: 'Tam duyuru ve aksiyon adımlarını incele',
  announcementsInquireActionText: 'RCIC Danışmanına Sorun',
  newsFeaturedBadgeText: 'Öne Çıkan Haber',
  newsReadActionText: 'Oku',
};

async function seedListPages() {
  console.log(`Updating Pagination & List Pages layout in Sanity dataset "${dataset}"...`);

  const existingDocs = await client.fetch('*[_type == "insightsPage"]');

  if (existingDocs.length === 0) {
    console.log('No insightsPage document found.');
    return;
  }

  for (const doc of existingDocs) {
    const isTr = doc.language === 'tr';
    const defaults = isTr ? defaultListLayoutTr : defaultListLayoutEn;

    const patch = client.patch(doc._id).setIfMissing({
      paginationPrevText: defaults.paginationPrevText,
      paginationNextText: defaults.paginationNextText,
      breadcrumbBackToHubText: defaults.breadcrumbBackToHubText,
      infoChecklistKeyItemsTitle: defaults.infoChecklistKeyItemsTitle,
      infoViewFullGuideActionText: defaults.infoViewFullGuideActionText,
      infoConsultantActionText: defaults.infoConsultantActionText,
      infoMorePointsText: defaults.infoMorePointsText,
      announcementsEffectivePrefix: defaults.announcementsEffectivePrefix,
      announcementsActionTitle: defaults.announcementsActionTitle,
      announcementsViewFullActionText: defaults.announcementsViewFullActionText,
      announcementsInquireActionText: defaults.announcementsInquireActionText,
      newsFeaturedBadgeText: defaults.newsFeaturedBadgeText,
      newsReadActionText: defaults.newsReadActionText,
    });

    await patch.commit();
    console.log(`Updated pagination and list fields on document ${doc._id} (${doc.language || 'en'})`);
  }

  console.log('Pagination and List Pages seed complete!');
}

seedListPages().catch((err) => {
  console.error('Error seeding list pages:', err);
  process.exit(1);
});
