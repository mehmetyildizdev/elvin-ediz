import { defaultFaqPage } from '@/data/defaults/faq-page';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const seedFaqTask: Task = {
  id: 'faq',
  name: 'Seed FAQ Page',
  description: 'Seeds FAQ accordion items, categories, and consultation banners into Sanity CMS.',
  run: async (ctx: TaskContext) => {
    await upsertDocument(ctx, {
      _id: 'faqPage',
      _type: 'faqPage',
      language: 'en',
      ...defaultFaqPage,
    });
  },
};
