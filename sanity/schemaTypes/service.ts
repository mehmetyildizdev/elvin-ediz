import { defineField, defineType } from 'sanity';

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
      options: {
        list: [
          { title: 'Passport / Visitor Visa', value: 'passport' },
          { title: 'Suitcase / Temporary Residency', value: 'suitcase' },
          { title: 'Home / Permanent Residency', value: 'home' },
          { title: 'Briefcase / Start-Up Visa', value: 'briefcase' },
          { title: 'Graduation / Study Permit', value: 'graduation' },
          { title: 'File Text / LMIA', value: 'file-text' },
        ],
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
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'summary', media: 'coverImage' },
  },
});
