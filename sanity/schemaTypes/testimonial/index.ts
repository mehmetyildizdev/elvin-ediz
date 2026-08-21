import { defineType } from 'sanity';
import config from './index.json';
import { testimonialFields } from './fields';
import { languageField } from '../../i18n/schema';

export const testimonial = defineType({
  name: config.name,
  title: config.title,
  type: 'document',
  fields: [languageField, ...testimonialFields],
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

export default testimonial;
