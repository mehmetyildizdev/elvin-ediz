import { logger } from '../../lib/logger';
import type { Task, TaskContext } from '../../types';

const TARGET_TYPES = [
  'post',
  'service',
  'homePage',
  'insightsPage',
  'servicesPage',
  'aboutPage',
  'faqPage',
  'privacyPage',
  'testimonial',
  'staffMember',
  'staff',
  'siteSettings',
  'googleReviews',
];

export const assignLanguagesTask: Task = {
  id: 'assign-languages',
  name: 'Assign Default Language (en)',
  description:
    'Audits all CMS documents and assigns language: "en" to any document missing a language tag.',
  run: async (ctx: TaskContext) => {
    logger.info(`Fetching documents of types: [${TARGET_TYPES.join(', ')}]...`);

    const filter = `_type in $types && (!defined(language) || language != "en")`;
    const documents = await ctx.client.fetch<
      Array<{ _id: string; _type: string; title?: string; name?: string }>
    >(`*[${filter}]{ _id, _type, title, name, language }`, { types: TARGET_TYPES });

    logger.info(`Found ${documents.length} document(s) needing language: "en" assignment.`);

    if (documents.length === 0) {
      logger.success('All target documents already have language: "en" assigned.');
      return;
    }

    if (ctx.dryRun) {
      logger.dryRun(`Would patch language="en" for ${documents.length} documents:`);
      for (const doc of documents) {
        logger.dryRun(`  - [${doc._type}] ${doc._id} (${doc.title || doc.name || 'Untitled'})`);
      }
      return;
    }

    const tx = ctx.client.transaction();
    for (const doc of documents) {
      tx.patch(doc._id, (p) => p.set({ language: 'en' }));
      logger.info(`Queued: [${doc._type}] ${doc._id} -> language: "en"`);
    }

    await tx.commit();
    logger.success(`Successfully assigned language: "en" to ${documents.length} document(s).`);
  },
};
