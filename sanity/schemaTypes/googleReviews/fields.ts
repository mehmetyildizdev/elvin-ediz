import { defineField } from 'sanity';
import config from './fields.json';

export const googleReviewsFields = [
  defineField({
    name: config.fields.businessName.name,
    title: config.fields.businessName.title,
    type: 'string',
    initialValue: config.fields.businessName.initialValue,
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: config.fields.rating.name,
    title: config.fields.rating.title,
    type: 'number',
    initialValue: config.fields.rating.initialValue,
    validation: (rule) => rule.min(1).max(5),
  }),
  defineField({
    name: config.fields.totalReviews.name,
    title: config.fields.totalReviews.title,
    type: 'number',
    initialValue: config.fields.totalReviews.initialValue,
  }),
  defineField({
    name: config.fields.googleMapsUrl.name,
    title: config.fields.googleMapsUrl.title,
    type: 'url',
    initialValue: config.fields.googleMapsUrl.initialValue,
  }),
  defineField({
    name: config.fields.writeReviewUrl.name,
    title: config.fields.writeReviewUrl.title,
    type: 'url',
  }),
  defineField({
    name: config.fields.lastSyncedAt.name,
    title: config.fields.lastSyncedAt.title,
    type: 'datetime',
    readOnly: true,
  }),
  defineField({
    name: config.fields.reviews.name,
    title: config.fields.reviews.title,
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
];
