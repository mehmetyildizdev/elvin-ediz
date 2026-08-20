import { defineArrayMember, defineField, defineType } from 'sanity';
import { StructuredDataTypeSelect } from '../../components/StructuredDataTypeSelect';

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Social Share',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title (Search Engine Title)',
      type: 'string',
      description:
        'Optimal length: 50–60 characters. Recommended format: "Primary Keyword – Secondary Keyword | Elvin Ediz". If left empty, the document/page title is used.',
      validation: (rule) =>
        rule.max(70).warning('Titles longer than 60 characters are typically truncated by Google search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (Search Snippet)',
      type: 'text',
      rows: 3,
      description:
        'Optimal length: 120–160 characters. An engaging summary shown below the title in search engine results. If left empty, the page excerpt/summary is used.',
      validation: (rule) =>
        rule.max(170).warning('Descriptions longer than 160 characters are typically truncated by Google.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (Open Graph / Twitter)',
      type: 'image',
      description:
        'Recommended dimensions: 1200 x 630 px. Displayed when this page or post is shared on LinkedIn, WhatsApp, Facebook, iMessage, and X (Twitter). If empty, the cover image or global site banner is used.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Image Alt Description',
          type: 'string',
          description: 'Descriptive alt text for screen readers and search crawlers.',
        }),
      ],
    }),
    defineField({
      name: 'ogTitle',
      title: 'Social Share Title (Optional Override)',
      type: 'string',
      description:
        'Override the title displayed specifically on social media cards if you want a punchier headline than Google Search.',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Social Share Description (Optional Override)',
      type: 'text',
      rows: 2,
      description:
        'Override the description displayed on social media previews if you want platform-tailored copy.',
    }),
    defineField({
      name: 'keywords',
      title: 'Focus Keywords & Search Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
      description: 'Key search terms and topics for internal search indexing and topical relevance (e.g. "Express Entry", "CRS Score", "RCIC Toronto").',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL (Optional Override)',
      type: 'url',
      description:
        'Leave empty to use this page’s natural URL. Only specify if this content was originally published on another website to avoid duplicate content penalties.',
    }),
    defineField({
      name: 'structuredDataType',
      title: 'Structured Data Schema Type',
      type: 'string',
      initialValue: 'auto',
      validation: (rule) => rule.required(),
      components: {
        input: StructuredDataTypeSelect,
      },
      options: {
        list: [
          { title: 'Auto-detect based on page type (Recommended)', value: 'auto' },
          { title: 'Home & Organization (Local Legal Business & Website)', value: 'Organization' },
          { title: 'Article (Insights & Educational Guides)', value: 'Article' },
          { title: 'News Article (Immigration News & Reports)', value: 'NewsArticle' },
          { title: 'Professional Service (Immigration Pathway)', value: 'Service' },
          { title: 'FAQ Page (Questions & Answers)', value: 'FAQPage' },
          { title: 'About Page (Consultant & Firm Profile)', value: 'AboutPage' },
          { title: 'Contact Page (Booking & Office Info)', value: 'ContactPage' },
          { title: 'Collection / Hub (Insights, News, Guides Index)', value: 'CollectionPage' },
          { title: 'General Web Page', value: 'WebPage' },
        ],
      },
      description:
        'Defines the Schema.org JSON-LD structured data format. Defaults to "Auto-detect", which automatically applies the optimal schema for this page. Select an option only if you need a specific manual override.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines (noindex)',
      type: 'boolean',
      initialValue: false,
      description:
        'When enabled, instructs Google and search crawlers NOT to index this page (useful for private landing pages, drafts, or test pages).',
    }),
    defineField({
      name: 'noFollow',
      title: 'Do Not Follow Links (nofollow)',
      type: 'boolean',
      initialValue: false,
      description:
        'When enabled, instructs search crawlers not to follow external hyperlinks found on this page.',
    }),
  ],
});

export default seo;
