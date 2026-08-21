import type { Task, TaskGroup, TaskContext } from '../../types';
import { logger } from '../../lib/logger';
import { syncInsightsTask } from './sync-insights';
import { syncInformationTask } from './sync-information';
import { syncAnnouncementsTask } from './sync-announcements';
import { syncNewsTask } from './sync-news';
import { syncAllPostsTask } from './sync-all-posts';
import { syncServicesTask } from './sync-services';
import { syncGoogleReviewsTask } from './sync-google-reviews';

const tasks: Record<string, Task> = {
  insights: syncInsightsTask,
  information: syncInformationTask,
  announcements: syncAnnouncementsTask,
  news: syncNewsTask,
  'all-posts': syncAllPostsTask,
  services: syncServicesTask,
  'google-reviews': syncGoogleReviewsTask,
};

export const syncTaskGroup: TaskGroup = {
  name: 'sync',
  description: 'Syncs dynamic datasets, external feeds, and blog posts into Sanity CMS',
  tasks,
  runAll: async (ctx: TaskContext) => {
    logger.header('Starting Full Dataset Sync');
    for (const [id, task] of Object.entries(tasks)) {
      if (id === 'all-posts') continue; // Avoid redundant run
      logger.step(id.toUpperCase(), `Running: ${task.name}...`);
      await task.run(ctx);
    }
    logger.footer('Full Dataset Sync Completed Successfully');
  },
};
