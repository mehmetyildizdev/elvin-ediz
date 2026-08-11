import { defineArrayMember, defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'MEET YOUR CONSULTANT',
    }),
    defineField({
      name: 'title',
      title: 'Main Heading',
      type: 'string',
      initialValue: 'A steady guide for a big decision.',
    }),
    defineField({
      name: 'bioParagraph1',
      title: 'Bio Paragraph 1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'bioParagraph2',
      title: 'Bio Paragraph 2',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'credentials',
      title: 'Checklist / Key Credentials',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'photo',
      title: 'Consultant Profile Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
