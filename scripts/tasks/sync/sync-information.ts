import { defaultInformationPosts } from '@/data/defaults/posts/information';
import { logger } from '../../lib/logger';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const syncInformationTask: Task = {
  id: 'information',
  name: 'Sync Information Guides',
  description:
    'Syncs practical guide posts and interactive checklist criteria from data/defaults/posts/information into Sanity.',
  run: async (ctx: TaskContext) => {
    logger.info(`Processing ${defaultInformationPosts.length} information guide posts...`);

    for (const p of defaultInformationPosts) {
      const payload = {
        ...p,
        _type: 'post',
        kind: 'information',
      };
      await upsertDocument(ctx, payload);
    }
  },
};
