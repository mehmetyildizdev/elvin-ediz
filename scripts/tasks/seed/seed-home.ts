import { defaultHomePage } from '@/data/defaults/home-page';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const seedHomeTask: Task = {
  id: 'home',
  name: 'Seed Home Page',
  description:
    'Seeds home page hero, strategy, trust bar, and interactive sections into Sanity CMS.',
  run: async (ctx: TaskContext) => {
    await upsertDocument(ctx, {
      _id: 'homePage',
      _type: 'homePage',
      language: 'en',
      ...defaultHomePage,
    });
  },
};
