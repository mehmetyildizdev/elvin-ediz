import { defineField, defineType } from 'sanity';

export const staffMember = defineType({
  name: 'staffMember',
  title: 'Team Member / Staff',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'designation',
      title: 'Designation / Credentials',
      type: 'string',
      initialValue: 'RCIC',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Regulated Canadian Immigration Consultant',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Title',
      type: 'string',
      initialValue: 'Founder of Elvin Ediz Immigration Services',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'bio', title: 'Biography / Strategy Text', type: 'text', rows: 6 }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 1 }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
});
