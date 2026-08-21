import { defineArrayMember, defineField, defineType } from 'sanity';
import { UserIcon } from '@sanity/icons/User';
import { SearchIcon } from '@sanity/icons/Search';
import { languageField } from '../i18n/schema';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'content', title: '01. Content', icon: UserIcon, default: true },
    { name: 'seo', title: '02. SEO & Social', icon: SearchIcon },
  ],
  fields: [
    languageField,
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      group: 'content',
      initialValue: 'MEET YOUR CONSULTANT',
    }),
    defineField({
      name: 'title',
      title: 'Main Heading',
      type: 'string',
      group: 'content',
      initialValue: 'A steady guide for a big decision.',
    }),
    defineField({
      name: 'bioParagraph1',
      title: 'Bio Paragraph 1',
      type: 'text',
      group: 'content',
      rows: 4,
    }),
    defineField({
      name: 'bioParagraph2',
      title: 'Bio Paragraph 2',
      type: 'text',
      group: 'content',
      rows: 3,
    }),
    defineField({
      name: 'credentials',
      title: 'Checklist / Key Credentials',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'photo',
      title: 'Consultant Profile Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'seo',
      title: 'About Page SEO & Social Share',
      type: 'seo',
      group: 'seo',
      description:
        'Search engine metadata and social preview for the About page / consultant profile.',
    }),
  ],
});
