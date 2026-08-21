import { defineField, defineType } from 'sanity';
import { languageField } from '../i18n/schema';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    languageField,
    defineField({
      name: 'author',
      title: 'Author / Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location / Tag',
      type: 'string',
      placeholder: 'e.g. Toronto, Canada or France',
    }),
    defineField({
      name: 'quote',
      title: 'Review / Quote Content',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5 stars)',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: 'avatar',
      title: 'Author Photo / Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'quote',
      media: 'avatar',
      language: 'language',
    },
    prepare({ title, subtitle, media, language }) {
      const langBadge = language ? `[${language.toUpperCase()}] ` : '';
      return {
        title: `${langBadge}${title || 'Anonymous'}`,
        subtitle,
        media,
      };
    },
  },
});
