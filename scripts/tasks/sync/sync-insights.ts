import { defaultInsightPosts } from '@/data/defaults/posts/insights';
import { logger } from '../../lib/logger';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const syncInsightsTask: Task = {
  id: 'insights',
  name: 'Sync Insight Posts',
  description: 'Syncs in-depth thought leadership & strategic insight articles from data/defaults/posts/insights into Sanity.',
  run: async (ctx: TaskContext) => {
    // Resolve Nazly staff author if present
    let staffId = 'staff-nazly';
    if (!ctx.dryRun) {
      try {
        const staffDoc = await ctx.client.fetch<{ _id: string }>(
          `*[_type == "staffMember" && (name match "*Nazly*" || _id == "staff-nazly")][0]{ _id }`
        );
        if (staffDoc?._id) staffId = staffDoc._id;
      } catch {
        // Fallback to default ID
      }
    }

    logger.info(`Processing ${defaultInsightPosts.length} insight posts...`);

    for (const p of defaultInsightPosts) {
      const payload = {
        ...p,
        _type: 'post',
        kind: 'insight',
        author: {
          _type: 'reference',
          _ref: staffId,
        },
      };
      await upsertDocument(ctx, payload);
    }
  },
};
