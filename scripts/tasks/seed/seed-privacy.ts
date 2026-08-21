import { defaultPrivacyPage } from '@/data/defaults/privacy-page';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const seedPrivacyTask: Task = {
  id: 'privacy',
  name: 'Seed Privacy Page',
  description: 'Seeds Privacy policy statement, legal clauses, and CICC compliance text into Sanity CMS.',
  run: async (ctx: TaskContext) => {
    await upsertDocument(ctx, {
      _id: 'privacyPage',
      _type: 'privacyPage',
      language: 'en',
      ...defaultPrivacyPage,
    });
  },
};
