import { defineField, defineType } from 'sanity';
import { CaseIcon } from '@sanity/icons/Case';
import { SearchIcon } from '@sanity/icons/Search';
import { languageField } from '../i18n/schema';

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  groups: [
    { name: 'content', title: '01. Content', icon: CaseIcon, default: true },
    { name: 'seo', title: '02. SEO & Social', icon: SearchIcon },
  ],
  fields: [
    languageField,
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      group: 'content',
      initialValue: 'HOW WE CAN HELP',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleMain',
      title: 'Main Heading (Part 1)',
      type: 'string',
      group: 'content',
      initialValue: 'A pathway built',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleAccent',
      title: 'Accent Heading (Italicized)',
      type: 'string',
      group: 'content',
      initialValue: 'around you.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Hero Description / Copy',
      type: 'text',
      group: 'content',
      rows: 3,
      initialValue:
        'Personalized Canadian immigration guidance for the next chapter you are ready to build.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'Services Page SEO & Social Share',
      type: 'seo',
      group: 'seo',
      description:
        'Search engine metadata and social preview for the main Services directory page (/services).',
    }),
  ],
  preview: {
    select: {
      lang: 'language',
      title: 'titleMain',
      subtitle: 'eyebrow',
    },
    prepare({ lang, title, subtitle }) {
      const l = (lang || 'en').toUpperCase();
      return {
        title: `[${l}] Services Page`,
        subtitle: title ? `${subtitle ? `${subtitle} - ` : ''}${title}` : 'Hero Header Settings',
      };
    },
  },
});

