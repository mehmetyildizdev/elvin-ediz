#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { getScriptSanityClient } from './config/sanity';
import { seedTaskGroup } from './tasks/seed';
import { syncTaskGroup } from './tasks/sync';
import { maintenanceTaskGroup } from './tasks/maintenance';
import { logger } from './lib/logger';
import type { TaskGroup, TaskContext } from './types';

const groups: Record<string, TaskGroup> = {
  seed: seedTaskGroup,
  sync: syncTaskGroup,
  maintenance: maintenanceTaskGroup,
};

function printHelp(): void {
  console.log(`
\x1b[1m\x1b[36mElvin Ediz Immigration - Sanity CLI Runner\x1b[0m

\x1b[1mUSAGE:\x1b[0m
  pnpm cli <command> [options]

\x1b[1mCOMMANDS:\x1b[0m
  seed          Seed default CMS page layouts, services, and baseline data
  sync          Sync dynamic datasets, blog posts, and external reviews
  maintenance   Execute schema patches, audits, and language migrations
  list          List all available tasks across all categories

\x1b[1mOPTIONS:\x1b[0m
  --all, -a            Run all tasks in the specified command
  --target, -t <names> Comma-separated list of specific task IDs to run
  --dry-run, -d        Simulate execution without modifying Sanity data
  --help, -h           Show this help message

\x1b[1mEXAMPLES:\x1b[0m
  pnpm cli seed --all
  pnpm cli seed --target=about,services
  pnpm cli seed --all --dry-run
  pnpm cli sync --target=all-posts
  pnpm cli sync --target=news,announcements
  pnpm cli sync --target=google-reviews
  pnpm cli maintenance --target=assign-languages
`);
}

function listTasks(): void {
  logger.header('Available Task Groups & Tasks');
  for (const [groupKey, group] of Object.entries(groups)) {
    console.log(`\x1b[1m\x1b[35m[${groupKey.toUpperCase()}]\x1b[0m - ${group.description}`);
    for (const [taskId, task] of Object.entries(group.tasks)) {
      console.log(`  \x1b[36m${taskId.padEnd(20)}\x1b[0m ${task.description}`);
    }
    console.log('');
  }
}

async function main(): Promise<void> {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      all: { type: 'boolean', short: 'a', default: false },
      target: { type: 'string', short: 't' },
      'dry-run': { type: 'boolean', short: 'd', default: false },
      dryRun: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
  });

  const isDryRun = Boolean(values['dry-run'] || values.dryRun);

  if (values.help || positionals.length === 0) {
    printHelp();
    return;
  }

  const command = positionals[0].toLowerCase();

  if (command === 'list') {
    listTasks();
    return;
  }

  const group = groups[command];
  if (!group) {
    logger.error(`Unknown command: "${command}". Available commands: seed, sync, maintenance, list.`);
    printHelp();
    process.exit(1);
  }

  const client = getScriptSanityClient({ requireWriteToken: !isDryRun });
  const ctx: TaskContext = {
    client,
    dryRun: isDryRun,
  };

  if (isDryRun) {
    logger.warn('Running in DRY-RUN mode. No changes will be written to Sanity CMS.');
  }

  // 1. Run all tasks if --all is specified
  if (values.all) {
    await group.runAll(ctx);
    return;
  }

  // 2. Run specific target tasks if --target is specified
  if (values.target) {
    const targetIds = values.target.split(',').map((t) => t.trim().toLowerCase());
    logger.header(`Executing ${group.name.toUpperCase()} Tasks: [${targetIds.join(', ')}]`);

    for (const id of targetIds) {
      const task = group.tasks[id];
      if (!task) {
        logger.error(`Task "${id}" not found in [${group.name}] group.`);
        logger.info(`Available tasks: ${Object.keys(group.tasks).join(', ')}`);
        continue;
      }
      logger.step(id.toUpperCase(), `Running: ${task.name}...`);
      await task.run(ctx);
    }
    logger.footer(`Completed ${targetIds.length} task(s)`);
    return;
  }

  // If neither --all nor --target is provided, prompt user or run all with a warning
  logger.warn(`No --all or --target specified for command "${command}".`);
  logger.info(`Use --all to run all tasks or --target=<task-name> for specific tasks.`);
  logger.info(`Run "pnpm cli ${command} --help" or "pnpm cli list" to view tasks.`);
}

main().catch((err) => {
  logger.error('Unexpected CLI execution error:', err);
  process.exit(1);
});
