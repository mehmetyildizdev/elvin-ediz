import { defineField, defineType } from 'sanity';
import { CodeIcon } from '@sanity/icons/Code';
import { InfoOutlineIcon } from '@sanity/icons/InfoOutline';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { SparklesIcon } from '@sanity/icons/Sparkles';
import { SearchIcon } from '@sanity/icons/Search';
import { VisualIconPicker } from '../components/VisualIconPicker';
import { languageField, isSlugUniqueByLanguage, slugifyWithI18n } from '../i18n/schema';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    { name: 'general', title: '01. General Info', icon: InfoOutlineIcon, default: true },
    { name: 'body', title: '02. Overview & Body', icon: DocumentTextIcon },
    { name: 'cta', title: '03. Call to Action', icon: SparklesIcon },
    { name: 'seo', title: '04. SEO & Social', icon: SearchIcon },
  ],
  fields: [
    languageField,
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: slugifyWithI18n,
        isUnique: isSlugUniqueByLanguage,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'general',
      initialValue: 0,
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      group: 'general',
      components: {
        input: VisualIconPicker,
      },
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      group: 'general',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Key Features / Highlights',
      type: 'array',
      group: 'general',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'body',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Detailed Overview / Body',
      type: 'array',
      group: 'body',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        {
          type: 'object',
          name: 'markdownBlock',
          title: 'Markdown',
          icon: CodeIcon,
          fields: [
            defineField({
              name: 'content',
              type: 'markdown',
              title: 'Markdown Content',
            }),
          ],
          preview: {
            select: {
              content: 'content',
            },
            prepare({ content }) {
              return {
                title: 'Markdown Block',
                subtitle: content ? content.slice(0, 60) : 'Empty markdown content',
                media: CodeIcon,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Callout Title',
      description:
        'Optional custom heading for the callout box (defaults to "Apply for [Service Title]").',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSubtitle',
      title: 'Callout Subtitle',
      description:
        'Optional description (defaults to "Direct representation and assessment with Nazly Sunguroglu, RCIC.").',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Callout Button Text',
      description: 'Optional button label (defaults to "Book Free Consultation").',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'Callout Button Link',
      description:
        'Optional custom URL or WhatsApp link (defaults to WhatsApp message for this service).',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Media Settings',
      type: 'seo',
      group: 'seo',
      description:
        'Custom search engine snippet and social share cards for this specific immigration pathway.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
      media: 'coverImage',
      language: 'language',
    },
    prepare({ title, subtitle, media, language }) {
      const langBadge = language ? `[${language.toUpperCase()}] ` : '';
      return {
        title: `${langBadge}${title || 'Untitled Service'}`,
        subtitle: subtitle || 'Immigration Service',
        media,
      };
    },
  },
});
