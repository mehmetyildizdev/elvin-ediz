import { defineConfig, TemplateItem } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

const singletonTypes = new Set(['homePage', 'faqPage', 'siteSettings']);

export default defineConfig({
  name: 'elvin-ediz',
  title: 'Elvin Ediz Immigration Services',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    deskTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
    visionTool(),
  ],
  document: {
    newDocumentOptions: (previous: TemplateItem[]) =>
      previous.filter((item: TemplateItem) => !singletonTypes.has(item.templateId)),
  },
  schema: {
    types: schemaTypes,
  },
});
