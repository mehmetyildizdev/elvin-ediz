import { defineField, defineType } from 'sanity';

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'HOW WE CAN HELP',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleMain',
      title: 'Main Heading (Part 1)',
      type: 'string',
      initialValue: 'A pathway built',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleAccent',
      title: 'Accent Heading (Italicized)',
      type: 'string',
      initialValue: 'around you.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Hero Description / Copy',
      type: 'text',
      rows: 3,
      initialValue:
        'Personalized Canadian immigration guidance for the next chapter you are ready to build.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'titleMain',
      subtitle: 'eyebrow',
    },
    prepare({ title, subtitle }) {
      return {
        title: title ? `Services Page: ${title}` : 'Services Page Content',
        subtitle: subtitle || 'Hero Header Settings',
      };
    },
  },
});
