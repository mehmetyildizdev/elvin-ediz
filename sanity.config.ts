import { defineConfig, TemplateItem } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool, defineLocations } from 'sanity/presentation';
import { markdownSchema } from 'sanity-plugin-markdown';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

const singletonTypes = new Set(['homePage', 'insightsPage', 'faqPage', 'privacyPage', 'siteSettings']);

export default defineConfig({
  name: 'elvin-ediz',
  title: 'Elvin Ediz Immigration Services',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({ structure }),
    markdownSchema(),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft',
        },
      },
      resolve: {
        locations: {
          homePage: defineLocations({
            locations: [
              { title: 'Home Page', href: '/' },
              { title: 'Contact Page', href: '/contact' },
            ],
          }),
          insightsPage: defineLocations({
            locations: [{ title: 'Insights & Updates Hub', href: '/insights' }],
          }),
          faqPage: defineLocations({
            locations: [{ title: 'Q&A Page', href: '/questions' }],
          }),
          privacyPage: defineLocations({
            locations: [{ title: 'Privacy Policy Page', href: '/privacy' }],
          }),
          siteSettings: defineLocations({
            locations: [
              { title: 'Home', href: '/' },
              { title: 'Insights', href: '/insights' },
            ],
          }),
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
              kind: 'kind',
            },
            resolve: (doc) => {
              const kind = doc?.kind || 'insight';
              const basePath =
                kind === 'news'
                  ? '/news'
                  : kind === 'announcement'
                    ? '/announcements'
                    : kind === 'information'
                      ? '/information'
                      : '/insights';

              return {
                locations: [
                  {
                    title: doc?.title || 'Post Detail',
                    href: `${basePath}/${doc?.slug}`,
                  },
                  {
                    title: 'Category Feed',
                    href: basePath,
                  },
                  {
                    title: 'Insights Hub',
                    href: '/insights',
                  },
                ],
              };
            },
          }),
          service: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Service',
                  href: `/services/${doc?.slug}`,
                },
                {
                  title: 'Services Hub',
                  href: '/services',
                },
              ],
            }),
          }),
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
