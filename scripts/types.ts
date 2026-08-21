import type { SanityClient } from '@sanity/client';

export interface TaskContext {
  client: SanityClient;
  dryRun?: boolean;
  verbose?: boolean;
  forceProduction?: boolean;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  run: (ctx: TaskContext) => Promise<void>;
}

export interface TaskGroup {
  name: string;
  description: string;
  tasks: Record<string, Task>;
  runAll: (ctx: TaskContext) => Promise<void>;
}
