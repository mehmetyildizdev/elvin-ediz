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

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  'production';
const token = process.env.SANITY_EDITOR_TOKEN || process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Missing projectId or SANITY_EDITOR_TOKEN in environment');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-07-14',
  useCdn: false,
});

async function syncInsightPosts() {
  console.log(`Connecting to Sanity (${dataset})...`);

  // 1. Find Nazly staff ID
  let staffId = 'staff-nazly';
  try {
    const staffDoc = await client.fetch(
      `*[_type == "staffMember" && (name match "*Nazly*" || _id == "staff-nazly")][0]{ _id, name }`
    );
    if (staffDoc?._id) {
      staffId = staffDoc._id;
      console.log(`Resolved staff author: ${staffDoc.name} (${staffId})`);
    }
  } catch (err) {
    console.warn('Could not query staff document, using fallback ID:', staffId);
  }

  // 2. Fetch existing insight posts in Sanity to delete/overwrite old ones
  const existingInsights = await client.fetch(
    `*[_type == "post" && (kind == "insight" || kind == "insights")]{ _id, title }`
  );
  console.log(`Found ${existingInsights.length} existing insight posts in Sanity.`);

  for (const item of existingInsights) {
    console.log(`Deleting old insight post: "${item.title}" (${item._id})...`);
    await client.delete(item._id);
  }

  // 3. Read insight posts from data/insight-posts.json
  const rawData = fs.readFileSync('data/insight-posts.json', 'utf8');
  const insightPosts = JSON.parse(rawData);

  const formattedPosts = insightPosts.map((p) => ({
    ...p,
    author: {
      _type: 'reference',
      _ref: staffId,
    },
  }));

  // Re-save data/insight-posts.json with updated author reference
  fs.writeFileSync(
    'data/insight-posts.json',
    JSON.stringify(formattedPosts, null, 2)
  );
  console.log(`Saved ${formattedPosts.length} insight posts to data/insight-posts.json.`);

  // 4. Create new insight posts in Sanity
  console.log(`Pushing ${formattedPosts.length} insight posts to Sanity...`);
  for (const post of formattedPosts) {
    const res = await client.create(post);
    console.log(`✓ Created insight: "${res.title}" [${res.category}]`);
  }

  console.log(
    `\nAll ${formattedPosts.length} strategic insight articles successfully synced to Sanity!`
  );
}

syncInsightPosts().catch((err) => {
  console.error('Error syncing insight posts:', err);
  process.exit(1);
});
