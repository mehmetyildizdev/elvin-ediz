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

async function pushNewsPosts() {
  console.log(`Connecting to Sanity dataset "${dataset}" in project "${projectId}"...`);

  // Verify staff ID for Nazly
  let staffId = 'staff-nazly';
  try {
    const staffDoc = await client.fetch(
      `*[_type == "staffMember" && (name match "*Nazly*" || _id == "staff-nazly")][0]{ _id, name }`
    );
    if (staffDoc?._id) {
      staffId = staffDoc._id;
      console.log(`Found staff author: ${staffDoc.name} (${staffId})`);
    } else {
      console.log(`Using fallback staff author ID: ${staffId}`);
    }
  } catch (err) {
    console.warn('Could not query staff document, using staff-nazly as fallback:', err.message);
  }

  const postsRaw = fs.readFileSync('data/news-posts.json', 'utf8');
  const posts = JSON.parse(postsRaw);

  console.log(`Pushing ${posts.length} news posts to Sanity...`);

  for (const post of posts) {
    // Ensure author reference points to resolved staff ID
    const docToSave = {
      ...post,
      author: {
        _type: 'reference',
        _ref: staffId,
      },
    };

    const res = await client.createOrReplace(docToSave);
    console.log(`✓ Saved post "${res.title}" (_id: ${res._id})`);
  }

  console.log('All news posts have been successfully pushed to Sanity!');
}

pushNewsPosts().catch((err) => {
  console.error('Error pushing news posts to Sanity:', err);
  process.exit(1);
});
