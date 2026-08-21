import { defaultSiteSettings } from '@/data/defaults/site-settings';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const seedSiteSettingsTask: Task = {
  id: 'site-settings',
  name: 'Seed Site Settings',
  description: 'Seeds global site settings, navigation links, and contact information into Sanity CMS.',
  run: async (ctx: TaskContext) => {
    await upsertDocument(ctx, {
      _id: 'siteSettings',
      _type: 'siteSettings',
      language: 'en',
      ...defaultSiteSettings,
    });
  },
};
