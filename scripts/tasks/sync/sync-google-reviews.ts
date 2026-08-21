import { defaultGoogleReviews } from '@/data/defaults/google-reviews';
import { logger } from '../../lib/logger';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const syncGoogleReviewsTask: Task = {
  id: 'google-reviews',
  name: 'Sync Google Reviews',
  description: 'Syncs verified Google reviews, rating metrics, and review URLs into Sanity CMS.',
  run: async (ctx: TaskContext) => {
    logger.info('Syncing Google Reviews document into Sanity...');

    await upsertDocument(ctx, {
      _id: 'googleReviews',
      _type: 'googleReviews',
      language: 'en',
      ...defaultGoogleReviews,
      lastSyncedAt: new Date().toISOString(),
    });

    logger.success('Google Reviews synced successfully.');
  },
};
