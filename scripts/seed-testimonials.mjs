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

const defaultTestimonialsEn = {
  testimonialsGoogleBasedOnText: 'Based on',
  testimonialsGoogleReviewsCountText: 'reviews on Google',
  testimonialsGoogleViewButtonText: 'View on Google',
  testimonialsGoogleReviewButtonText: 'Review Us',
  testimonialsGoogleReadMoreText: 'Read on Google Maps',
  testimonialsGoogleVerifiedText: 'Verified Google Review',
  testimonialsCuratedTitle: 'Additional Client Cases & Feedback',
  testimonialsCuratedSubtitle: 'Direct client submissions',
  testimonialsCuratedBadgeText: 'Client Case',
};

const defaultTestimonialsTr = {
  testimonialsGoogleBasedOnText: 'Google üzerindeki',
  testimonialsGoogleReviewsCountText: 'değerlendirmeye dayanmaktadır',
  testimonialsGoogleViewButtonText: 'Google’da İnceleyin',
  testimonialsGoogleReviewButtonText: 'Bizi Değerlendirin',
  testimonialsGoogleReadMoreText: 'Google Haritalar’da Oku',
  testimonialsGoogleVerifiedText: 'Doğrulanmış Google Yorumu',
  testimonialsCuratedTitle: 'Ek Danışan Deneyimleri ve Geri Bildirimler',
  testimonialsCuratedSubtitle: 'Doğrudan danışan paylaşımları',
  testimonialsCuratedBadgeText: 'Danışan Hikayesi',
};

async function seedTestimonials() {
  console.log(`Updating Testimonials fields in Sanity dataset "${dataset}"...`);

  const existingDocs = await client.fetch('*[_type == "homePage"]');

  if (existingDocs.length === 0) {
    console.log('No homePage document found.');
    return;
  }

  for (const doc of existingDocs) {
    const isTr = doc.language === 'tr';
    const defaults = isTr ? defaultTestimonialsTr : defaultTestimonialsEn;

    const patch = client.patch(doc._id).setIfMissing({
      testimonialsGoogleBasedOnText: defaults.testimonialsGoogleBasedOnText,
      testimonialsGoogleReviewsCountText: defaults.testimonialsGoogleReviewsCountText,
      testimonialsGoogleViewButtonText: defaults.testimonialsGoogleViewButtonText,
      testimonialsGoogleReviewButtonText: defaults.testimonialsGoogleReviewButtonText,
      testimonialsGoogleReadMoreText: defaults.testimonialsGoogleReadMoreText,
      testimonialsGoogleVerifiedText: defaults.testimonialsGoogleVerifiedText,
      testimonialsCuratedTitle: defaults.testimonialsCuratedTitle,
      testimonialsCuratedSubtitle: defaults.testimonialsCuratedSubtitle,
      testimonialsCuratedBadgeText: defaults.testimonialsCuratedBadgeText,
    });

    await patch.commit();
    console.log(`Updated testimonials fields on document ${doc._id} (${doc.language || 'en'})`);
  }

  console.log('Testimonials seed complete!');
}

seedTestimonials().catch((err) => {
  console.error('Error seeding testimonials:', err);
  process.exit(1);
});
