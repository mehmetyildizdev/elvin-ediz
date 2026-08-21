import { defaultNewsPosts } from '@/data/defaults/posts/news';
import { logger } from '../../lib/logger';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const syncNewsTask: Task = {
  id: 'news',
  name: 'Sync Real News Posts',
  description:
    'Syncs immigration news articles and real-world newsroom feeds from data/defaults/posts/news into Sanity.',
  run: async (ctx: TaskContext) => {
    logger.info(`Processing ${defaultNewsPosts.length} news posts...`);

    for (const p of defaultNewsPosts) {
      const payload = {
        ...p,
        _type: 'post',
        kind: 'news',
      };
      await upsertDocument(ctx, payload);
    }
  },
};
