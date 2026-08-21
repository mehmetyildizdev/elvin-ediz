import { syncInsightsTask } from './sync-insights';
import { syncInformationTask } from './sync-information';
import { syncAnnouncementsTask } from './sync-announcements';
import { syncNewsTask } from './sync-news';
import { logger } from '../../lib/logger';
import type { Task, TaskContext } from '../../types';

export const syncAllPostsTask: Task = {
  id: 'all-posts',
  name: 'Sync All Post Kinds',
  description: 'Syncs all 4 post kinds (Insights, Information Guides, Announcements, News) into Sanity CMS.',
  run: async (ctx: TaskContext) => {
    logger.info('Starting sync for all post kinds...');
    await syncInsightsTask.run(ctx);
    await syncInformationTask.run(ctx);
    await syncAnnouncementsTask.run(ctx);
    await syncNewsTask.run(ctx);
    logger.success('All post kinds synced successfully!');
  },
};
