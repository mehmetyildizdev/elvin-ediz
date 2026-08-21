import { createClient, type SanityClient } from '@sanity/client';
import { loadEnv } from '../lib/env';
import { logger } from '../lib/logger';

loadEnv();

export interface SanityConfigOptions {
  requireWriteToken?: boolean;
}

export function getScriptSanityClient(
  options: SanityConfigOptions = { requireWriteToken: true }
): SanityClient {
  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID ||
    process.env.SANITY_PROJECT_ID;

  const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    process.env.SANITY_STUDIO_DATASET ||
    process.env.SANITY_DATASET ||
    'production';

  const token =
    process.env.SANITY_EDITOR_TOKEN ||
    process.env.SANITY_API_WRITE_TOKEN ||
    process.env.SANITY_AUTH_TOKEN;

  if (!projectId) {
    logger.error('Missing SANITY_PROJECT_ID. Please check your .env.local file.');
    process.exit(1);
  }

  if (options.requireWriteToken && !token) {
    logger.error('Missing SANITY_EDITOR_TOKEN / SANITY_API_WRITE_TOKEN in environment.');
    logger.info(
      'Please add SANITY_EDITOR_TOKEN or SANITY_API_WRITE_TOKEN with write access to .env.local'
    );
    process.exit(1);
  }

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2026-07-14',
    useCdn: false,
  });
}
