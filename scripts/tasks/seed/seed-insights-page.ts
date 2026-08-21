import { defaultInsightsPage } from '@/data/defaults/insights-page';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const seedInsightsPageTask: Task = {
  id: 'insights-page',
  name: 'Seed Insights Hub Page',
  description: 'Seeds Insights page category navigation, section dividers, and consultation cards into Sanity CMS.',
  run: async (ctx: TaskContext) => {
    await upsertDocument(ctx, {
      _id: 'insightsPage',
      _type: 'insightsPage',
      language: 'en',
      ...defaultInsightsPage,
    });
  },
};
