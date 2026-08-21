import { defineLive } from 'next-sanity/live';
import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_EDITOR_TOKEN || process.env.SANITY_API_READ_TOKEN;

const isDev = process.env.NODE_ENV === 'development';

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-07-14',
  useCdn: false,
  stega: {
    studioUrl:
      process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
      (isDev ? 'http://localhost:3333' : 'https://elvin-ediz.sanity.studio'),
  },
});

export const { sanityFetch, SanityLive } = defineLive({
  client,
  browserToken: token,
  serverToken: token,
});
