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

const defaultInsightsLayoutEn = {
  sectionDividerBadgeText: 'Knowledge Base & Community Updates',
  insightsReadArticleText: 'Read article',
  insightsEmptyMessage: 'No insight articles available currently.',
  infoViewAllText: 'All Guides →',
  infoBadgeText: 'Practical Guide',
  infoCuratedByText: 'Curated by Elvin Ediz Immigration Advisory',
  infoExploreGuideText: 'Explore guide',
  infoEmptyMessage: 'No practical guides found.',
  announcementsViewAllText: 'All →',
  announcementsBadgeText: 'Official Notice',
  announcementsViewActionText: 'View announcement',
  newsViewAllText: 'All →',
  newsReadStoryText: 'Read story',
  newsSourceLabel: 'Source',
};

const defaultInsightsLayoutTr = {
  sectionDividerBadgeText: 'Bilgi Bankası ve Topluluk Güncellemeleri',
  insightsReadArticleText: 'Yazıyı oku',
  insightsEmptyMessage: 'Şu anda mevcut makale bulunmamaktadır.',
  infoViewAllText: 'Tüm Rehberler →',
  infoBadgeText: 'Uygulama Rehberi',
  infoCuratedByText: 'Elvin Ediz Göçmenlik Danışmanlığı Tarafından Hazırlandı',
  infoExploreGuideText: 'Rehberi incele',
  infoEmptyMessage: 'Henüz rehber bulunamadı.',
  announcementsViewAllText: 'Tümü →',
  announcementsBadgeText: 'Resmi Duyuru',
  announcementsViewActionText: 'Duyuruyu incele',
  newsViewAllText: 'Tümü →',
  newsReadStoryText: 'Haberi oku',
  newsSourceLabel: 'Kaynak',
};

async function seedInsightsLayout() {
  console.log(`Updating Insights Page layout & buttons in Sanity dataset "${dataset}"...`);

  const existingDocs = await client.fetch('*[_type == "insightsPage"]');

  if (existingDocs.length === 0) {
    console.log('No insightsPage document found.');
    return;
  }

  for (const doc of existingDocs) {
    const isTr = doc.language === 'tr';
    const defaults = isTr ? defaultInsightsLayoutTr : defaultInsightsLayoutEn;

    const patch = client.patch(doc._id).setIfMissing({
      sectionDividerBadgeText: defaults.sectionDividerBadgeText,
      insightsReadArticleText: defaults.insightsReadArticleText,
      insightsEmptyMessage: defaults.insightsEmptyMessage,
      infoViewAllText: defaults.infoViewAllText,
      infoBadgeText: defaults.infoBadgeText,
      infoCuratedByText: defaults.infoCuratedByText,
      infoExploreGuideText: defaults.infoExploreGuideText,
      infoEmptyMessage: defaults.infoEmptyMessage,
      announcementsViewAllText: defaults.announcementsViewAllText,
      announcementsBadgeText: defaults.announcementsBadgeText,
      announcementsViewActionText: defaults.announcementsViewActionText,
      newsViewAllText: defaults.newsViewAllText,
      newsReadStoryText: defaults.newsReadStoryText,
      newsSourceLabel: defaults.newsSourceLabel,
    });

    await patch.commit();
    console.log(`Updated insightsPage fields on document ${doc._id} (${doc.language || 'en'})`);
  }

  console.log('Insights Page layout seed complete!');
}

seedInsightsLayout().catch((err) => {
  console.error('Error seeding insights layout:', err);
  process.exit(1);
});
