import { defaultAnnouncementPosts } from '@/data/defaults/posts/announcements';
import { logger } from '../../lib/logger';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const syncAnnouncementsTask: Task = {
  id: 'announcements',
  name: 'Sync Announcement Posts',
  description:
    'Syncs official IRCC directives, policy updates, and office notices from data/defaults/posts/announcements into Sanity.',
  run: async (ctx: TaskContext) => {
    logger.info(`Processing ${defaultAnnouncementPosts.length} announcement posts...`);

    for (const p of defaultAnnouncementPosts) {
      const payload = {
        ...p,
        _type: 'post',
        kind: 'announcement',
      };
      await upsertDocument(ctx, payload);
    }
  },
};
