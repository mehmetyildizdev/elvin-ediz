import { defineField, defineType } from 'sanity';
import { CodeIcon } from '@sanity/icons/Code';
import { VisualIconPicker } from '../components/VisualIconPicker';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      components: {
        input: VisualIconPicker,
      },
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Key Features / Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Detailed Overview / Body',
      type: 'array',
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
      description: 'Optional custom heading for the callout box (defaults to "Apply for [Service Title]").',
      type: 'string',
    }),
    defineField({
      name: 'ctaSubtitle',
      title: 'Callout Subtitle',
      description: 'Optional description (defaults to "Direct representation and assessment with Nazly Sunguroglu, RCIC.").',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Callout Button Text',
      description: 'Optional button label (defaults to "Book Free Consultation").',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'Callout Button Link',
      description: 'Optional custom URL or WhatsApp link (defaults to WhatsApp message for this service).',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'summary', media: 'coverImage' },
  },
});
