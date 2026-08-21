import { defaultAboutPage } from '@/data/defaults/about-page';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const seedAboutTask: Task = {
  id: 'about',
  name: 'Seed About Page',
  description: 'Seeds About page sections, RCIC leadership bio, and strategic process into Sanity CMS.',
  run: async (ctx: TaskContext) => {
    await upsertDocument(ctx, {
      _id: 'aboutPage',
      _type: 'aboutPage',
      language: 'en',
      ...defaultAboutPage,
    });
  },
};
