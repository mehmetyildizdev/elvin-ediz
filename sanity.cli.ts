import fs from 'node:fs';
import { defineCliConfig } from 'sanity/cli';

if (fs.existsSync('.env.local')) {
  try {
    process.loadEnvFile('.env.local');
  } catch {}
}

export default defineCliConfig({
  api: {
    projectId:
      process.env.SANITY_STUDIO_PROJECT_ID ||
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
      '',
    dataset:
      process.env.SANITY_STUDIO_DATASET ||
      process.env.NEXT_PUBLIC_SANITY_DATASET ||
      'production',
  },
  deployment: {
    appId: 'drd8ieqii4k4xpqhmzk2zd1h',
  },
  studioHost: process.env.SANITY_STUDIO_HOST || 'elvin-ediz',
});
