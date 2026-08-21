import { createImageUrlBuilder } from '@sanity/image-url';

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || '';
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

export function urlForImage(source: any) {
  if (!builder || !source) return null;
  return builder.image(source).auto('format').fit('max');
}
