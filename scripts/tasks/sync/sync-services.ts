import { defaultServices } from '@/data/defaults/services';
import { defaultServicesPage } from '@/data/defaults/services-page';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const syncServicesTask: Task = {
  id: 'services',
  name: 'Sync Rich Services & Services Page',
  description: 'Syncs all 5 structured services and full rich body blocks into Sanity CMS.',
  run: async (ctx: TaskContext) => {
    // 1. Services page layout
    await upsertDocument(ctx, {
      _id: 'servicesPage',
      _type: 'servicesPage',
      language: 'en',
      ...defaultServicesPage,
    });

    // 2. Services data
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
