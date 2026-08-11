import { defineArrayMember, defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow Text',
      type: 'string',
      initialValue: 'ELVIN EDIZ IMMIGRATION SERVICES',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Main Title',
      type: 'string',
      initialValue: 'Your Canadian story starts here.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      initialValue:
        'Clear, compassionate immigration guidance for the life you are ready to build in Canada.',
    }),
    defineField({
      name: 'heroPrimaryCtaText',
      title: 'Hero Primary Button Text',
      type: 'string',
      initialValue: 'Begin your journey',
    }),
    defineField({
      name: 'heroPrimaryCtaLink',
      title: 'Hero Primary Button Link',
      type: 'string',
      initialValue: '#contact',
    }),
    defineField({
      name: 'heroSecondaryCtaText',
      title: 'Hero Secondary Link Text',
      type: 'string',
      initialValue: 'Explore services',
    }),
    defineField({
      name: 'badgeText',
      title: 'Compass Badge Text',
      type: 'string',
      initialValue: 'EST. 2018',
    }),

    // Statistics Bar
    defineField({
      name: 'stats',
      title: 'Trust Counter Statistics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'statItem',
          fields: [
            defineField({ name: 'number', title: 'Stat Value', type: 'string' }),
            defineField({ name: 'label', title: 'Stat Label', type: 'string' }),
          ],
        }),
      ],
    }),

    // Strategy & Who Are We Section
    defineField({
      name: 'strategyEyebrow',
      title: 'Strategy Section Eyebrow',
      type: 'string',
      initialValue: 'WHO ARE WE?',
    }),
    defineField({
      name: 'strategyTitle',
      title: 'Strategy Section Title',
      type: 'string',
      initialValue: 'Elvin Ediz Immigration Services',
    }),
    defineField({
      name: 'strategyParagraph1',
      title: 'Strategy Paragraph 1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'strategyParagraph2',
      title: 'Strategy Paragraph 2',
      type: 'text',
      rows: 3,
    }),

    // Callout Banner
    defineField({
      name: 'calloutEyebrow',
      title: 'Callout Eyebrow',
      type: 'string',
      initialValue: 'NOT SURE WHERE TO BEGIN?',
    }),
    defineField({
      name: 'calloutTitle',
      title: 'Callout Title',
      type: 'string',
      initialValue: 'We can find the right starting point.',
    }),
    defineField({
      name: 'calloutCtaText',
      title: 'Callout Button Text',
      type: 'string',
      initialValue: 'Book a consultation',
    }),
  ],
});
