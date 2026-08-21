import { defaultServices } from '@/data/defaults/services';
import { defaultServicesPage } from '@/data/defaults/services-page';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const seedServicesTask: Task = {
  id: 'services',
  name: 'Seed Services & Services Page',
  description:
    'Seeds all 5 immigration pathway services and the main Services page layout into Sanity CMS.',
  run: async (ctx: TaskContext) => {
    // 1. Upsert Services Page document
    await upsertDocument(ctx, {
      _id: 'servicesPage',
      _type: 'servicesPage',
      language: 'en',
      ...defaultServicesPage,
    });

    // 2. Upsert each Service document
    for (const s of defaultServices) {
      await upsertDocument(ctx, {
        _id: s._id,
        _type: 'service',
        language: 'en',
        title: s.title,
        slug: { _type: 'slug', current: s.slug },
        order: s.order,
        iconName: s.iconName,
        summary: s.summary,
        features: s.features,
        body: s.body,
        ctaTitle: s.ctaTitle,
        ctaSubtitle: s.ctaSubtitle,
        ctaButtonText: s.ctaButtonText,
      });
    }
  },
};
