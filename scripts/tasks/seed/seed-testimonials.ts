import { defaultTestimonials } from '@/data/defaults/testimonials';
import { defaultGoogleReviews } from '@/data/defaults/google-reviews';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const seedTestimonialsTask: Task = {
  id: 'testimonials',
  name: 'Seed Testimonials & Google Reviews',
  description: 'Seeds curated testimonials and Google review settings into Sanity CMS.',
  run: async (ctx: TaskContext) => {
    // 1. Upsert individual curated testimonials
    for (const t of defaultTestimonials) {
      await upsertDocument(ctx, {
        _id: t._id,
        _type: 'testimonial',
        language: 'en',
        author: t.author,
        location: t.location,
        rating: t.rating,
        quote: t.quote,
      });
    }

    // 2. Upsert Google Reviews document
    await upsertDocument(ctx, {
      _id: 'googleReviews',
      _type: 'googleReviews',
      language: 'en',
      ...defaultGoogleReviews,
    });
  },
};
