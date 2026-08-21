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
  console.error('Missing projectId or SANITY_EDITOR_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const TARGET_TYPES = [
  'post',
  'service',
  'homePage',
  'insightsPage',
  'servicesPage',
  'aboutPage',
  'faqPage',
  'privacyPage',
  'testimonial',
  'staffMember',
  'siteSettings',
];

async function assignEnglishLanguage() {
  console.log(`\n🔍 Fetching documents of types: [${TARGET_TYPES.join(', ')}]...`);

  const filter = `_type in $types && (!defined(language) || language != "en")`;
  const documents = await client.fetch(`*[${filter}]{ _id, _type, title, name, language }`, {
    types: TARGET_TYPES,
  });

  console.log(`Found ${documents.length} document(s) needing language: "en" assignment.\n`);

  if (documents.length === 0) {
    console.log('✅ All target documents already have language: "en" assigned.');
    return;
  }

  let updatedCount = 0;
  const transaction = client.transaction();

  for (const doc of documents) {
    const docLabel = doc.title || doc.name || doc._id;
    console.log(`  ➕ Patching [${doc._type}] "${docLabel}" (${doc._id}) -> language: "en"`);
    transaction.patch(doc._id, (p) => p.set({ language: 'en' }));
    updatedCount++;
  }

  console.log(`\n⏳ Committing ${updatedCount} patch mutations...`);
  const result = await transaction.commit();
  console.log(
    `🎉 Successfully assigned language: "en" to ${updatedCount} document(s)! Transaction ID: ${result.transactionId}`
  );
}

assignEnglishLanguage().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
