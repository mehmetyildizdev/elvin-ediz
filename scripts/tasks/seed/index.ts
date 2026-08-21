import type { Task, TaskGroup, TaskContext } from '../../types';
import { logger } from '../../lib/logger';
import { seedSiteSettingsTask } from './seed-site-settings';
import { seedHomeTask } from './seed-home';
import { seedAboutTask } from './seed-about';
import { seedServicesTask } from './seed-services';
import { seedStaffTask } from './seed-staff';
import { seedTestimonialsTask } from './seed-testimonials';
import { seedInsightsPageTask } from './seed-insights-page';
import { seedPostsTask } from './seed-posts';
import { seedFaqTask } from './seed-faq';
import { seedPrivacyTask } from './seed-privacy';
import { seedContactTask } from './seed-contact';

const tasks: Record<string, Task> = {
  'site-settings': seedSiteSettingsTask,
  home: seedHomeTask,
  about: seedAboutTask,
  services: seedServicesTask,
  staff: seedStaffTask,
  testimonials: seedTestimonialsTask,
  'insights-page': seedInsightsPageTask,
  posts: seedPostsTask,
  faq: seedFaqTask,
  privacy: seedPrivacyTask,
  contact: seedContactTask,
};

export const seedTaskGroup: TaskGroup = {
  name: 'seed',
  description: 'Populates Sanity CMS with structured default content from data/defaults',
  tasks,
  runAll: async (ctx: TaskContext) => {
    logger.header('Starting Full CMS Seeding');
    for (const [id, task] of Object.entries(tasks)) {
      logger.step(id.toUpperCase(), `Running: ${task.name}...`);
      await task.run(ctx);
    }
    logger.footer('Full CMS Seeding Completed Successfully');
  },
};
