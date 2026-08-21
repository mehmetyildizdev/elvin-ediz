import { defineConfig, TemplateItem } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool, defineLocations } from 'sanity/presentation';
import { markdownSchema } from 'sanity-plugin-markdown';
import { documentInternationalization } from '@sanity/document-internationalization';
import { internationalizedArray } from 'sanity-plugin-internationalized-array';

import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';
import { documentI18nConfig, internationalizedArrayConfig } from './sanity/i18n';
import { StudioLogo, StudioIcon } from './sanity/components/StudioLogo';

const singletonTypes = new Set([
  'homePage',
  'insightsPage',
  'faqPage',
  'privacyPage',
  'siteSettings',
]);
const nonCreatableTypes = new Set([...singletonTypes, 'translation.metadata']);

const getPreviewOrigin = () => {
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ) {
    return 'http://localhost:3000';
  }
  return process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';
};

export default defineConfig({
  name: 'elvin-ediz',
  title: 'Elvin Ediz Immigration Services',
  icon: StudioIcon,
  studio: {
    components: {
      logo: StudioLogo,
    },
  },
  projectId:
    process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset:
    process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({ structure }),
    markdownSchema(),
    documentInternationalization(documentI18nConfig),
    internationalizedArray(internationalizedArrayConfig),
    presentationTool({
      previewUrl: {
        origin: getPreviewOrigin(),
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
            locations: [
              { title: 'Insights & Updates Hub', href: '/insights' },
              { title: 'Information Guides', href: '/information' },
              { title: 'Announcements', href: '/announcements' },
              { title: 'News', href: '/news' },
            ],
          }),
          servicesPage: defineLocations({
            locations: [{ title: 'Services Page', href: '/services' }],
          }),
          faqPage: defineLocations({
            locations: [{ title: 'Q&A Page', href: '/questions' }],
          }),
          aboutPage: defineLocations({
            locations: [{ title: 'About Us Page', href: '/about' }],
          }),
          privacyPage: defineLocations({
            locations: [{ title: 'Privacy Policy Page', href: '/privacy' }],
          }),
          siteSettings: defineLocations({
            locations: [
              { title: 'Home', href: '/' },
              { title: 'About', href: '/about' },
              { title: 'Services', href: '/services' },
              { title: 'Insights', href: '/insights' },
              { title: 'Q&A', href: '/questions' },
              { title: 'Privacy Policy', href: '/privacy' },
              { title: 'Contact', href: '/contact' },
            ],
          }),
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
              kind: 'kind',
            },
            resolve: (doc: Record<string, any> | null | undefined) => {
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
            resolve: (doc: Record<string, any> | null | undefined) => ({
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
      previous.filter((item: TemplateItem) => !nonCreatableTypes.has(item.templateId)),
  },
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'post-by-kind-and-language',
        title: 'Post by Kind and Language',
        schemaType: 'post',
        parameters: [
          { name: 'kind', type: 'string' },
          { name: 'language', type: 'string' },
        ],
        value: ({ kind, language }: { kind?: string; language?: string }) => ({
          kind: kind || 'insight',
          language: language || 'en',
        }),
      },
      {
        id: 'service-by-language',
        title: 'Service by Language',
        schemaType: 'service',
        parameters: [{ name: 'language', type: 'string' }],
        value: ({ language }: { language?: string }) => ({
          language: language || 'en',
        }),
      },
    ],
  },
});
