import type { Task, TaskGroup, TaskContext } from '../../types';
import { logger } from '../../lib/logger';
import { assignLanguagesTask } from './assign-languages';
import { linkTranslationsTask } from './link-translations';

const tasks: Record<string, Task> = {
  'assign-languages': assignLanguagesTask,
  'link-translations': linkTranslationsTask,
};

export const maintenanceTaskGroup: TaskGroup = {
  name: 'maintenance',
  description: 'Schema repairs, data audits, and batch migration operations',
  tasks,
  runAll: async (ctx: TaskContext) => {
    logger.header('Starting Maintenance Operations');
    for (const [id, task] of Object.entries(tasks)) {
      logger.step(id.toUpperCase(), `Running: ${task.name}...`);
      await task.run(ctx);
    }
    logger.footer('Maintenance Operations Completed Successfully');
  },
};
