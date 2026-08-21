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

const defaultServicesPageEn = {
  pathwayNavTitle: 'Select Pathway',
  pathwayNumberPrefix: 'PATHWAY',
  rcicAssessedBadgeText: 'RCIC Assessed',
  pathwaySummaryTitle: 'Pathway Summary',
  featuresSectionTitle: 'Key Requirements & Inclusions',
  detailedOverviewTitle: 'Detailed Pathway Overview',
  calloutEyebrow: 'NOT SURE WHERE TO BEGIN?',
  calloutTitleMain: 'We can find the',
  calloutTitleAccent: 'right starting point.',
  calloutButtonText: 'Free Consultation',
};

const defaultServicesPageTr = {
  pathwayNavTitle: 'Göçmenlik Yolu Seçin',
  pathwayNumberPrefix: 'PROGRAM',
  rcicAssessedBadgeText: 'RCIC Denetimli',
  pathwaySummaryTitle: 'Program Özeti',
  featuresSectionTitle: 'Temel Şartlar ve Hizmet Kapsamı',
  detailedOverviewTitle: 'Detaylı Program Açıklaması',
  calloutEyebrow: 'NEREDEN BAŞLAYACAĞINIZDAN EMİN DEĞİL MİSİNİZ?',
  calloutTitleMain: 'Sizin için en doğru',
  calloutTitleAccent: 'başlangıç noktasını belirleyelim.',
  calloutButtonText: 'Ücretsiz Danışmanlık',
};

async function seedServicesPage() {
  console.log(`Updating Services Page fields in Sanity dataset "${dataset}"...`);

  const existingDocs = await client.fetch('*[_type == "servicesPage"]');

  if (existingDocs.length === 0) {
    console.log('No servicesPage document found.');
    return;
  }

  for (const doc of existingDocs) {
    const isTr = doc.language === 'tr';
    const defaults = isTr ? defaultServicesPageTr : defaultServicesPageEn;

    const patch = client.patch(doc._id).setIfMissing({
      pathwayNavTitle: defaults.pathwayNavTitle,
      pathwayNumberPrefix: defaults.pathwayNumberPrefix,
      rcicAssessedBadgeText: defaults.rcicAssessedBadgeText,
      pathwaySummaryTitle: defaults.pathwaySummaryTitle,
      featuresSectionTitle: defaults.featuresSectionTitle,
      detailedOverviewTitle: defaults.detailedOverviewTitle,
      calloutEyebrow: defaults.calloutEyebrow,
      calloutTitleMain: defaults.calloutTitleMain,
      calloutTitleAccent: defaults.calloutTitleAccent,
      calloutButtonText: defaults.calloutButtonText,
    });

    await patch.commit();
    console.log(`Updated servicesPage fields on document ${doc._id} (${doc.language || 'en'})`);
  }

  console.log('Services Page seed complete!');
}

seedServicesPage().catch((err) => {
  console.error('Error seeding servicesPage:', err);
  process.exit(1);
});
