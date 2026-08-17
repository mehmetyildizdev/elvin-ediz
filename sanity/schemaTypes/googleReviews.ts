import { defineField, defineType } from 'sanity';

export const googleReviews = defineType({
  name: 'googleReviews',
  title: 'Google Reviews (Synced)',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      initialValue: 'Elvin Ediz Immigration Services',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Overall Rating (e.g. 4.9)',
      type: 'number',
      initialValue: 4.9,
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: 'totalReviews',
      title: 'Total Review Count',
      type: 'number',
      initialValue: 73,
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Profile URL',
      type: 'url',
      initialValue: 'https://maps.google.com/?q=Elvin+Ediz+Immigration+Services',
    }),
    defineField({
      name: 'writeReviewUrl',
      title: 'Google Review Link (Leave a Review)',
      type: 'url',
    }),
    defineField({
      name: 'lastSyncedAt',
      title: 'Last Synced At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'reviews',
      title: 'Recent Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'googleReviewItem',
          title: 'Google Review',
          fields: [
            defineField({
              name: 'author',
              title: 'Reviewer Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'avatarUrl',
              title: 'Avatar Image URL',
              type: 'url',
            }),
            defineField({
              name: 'rating',
              title: 'Stars (1-5)',
              type: 'number',
              initialValue: 5,
            }),
            defineField({
              name: 'date',
              title: 'Relative Date (e.g. 2 weeks ago)',
              type: 'string',
            }),
            defineField({
              name: 'quote',
              title: 'Review Text',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'highlight',
              title: 'Highlight / Feature on Homepage',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'quote',
              rating: 'rating',
            },
            prepare({ title, subtitle, rating }) {
              return {
                title: `${title} (${rating || 5} ★)`,
                subtitle: subtitle || 'No text provided',
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'businessName',
      rating: 'rating',
      totalReviews: 'totalReviews',
    },
    prepare({ title, rating, totalReviews }) {
      return {
        title: title || 'Google Reviews',
        subtitle: `Rating: ${rating || 4.9} ★ (${totalReviews || 0} reviews)`,
      };
    },
  },
});
