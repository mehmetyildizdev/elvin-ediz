import { defineType } from 'sanity';
import config from './index.json';
import { googleReviewsFields } from './fields';

export const googleReviews = defineType({
  name: config.name,
  title: config.title,
  type: 'document',
  fields: googleReviewsFields,
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

export default googleReviews;
