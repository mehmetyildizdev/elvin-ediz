import { defaultStaff } from '@/data/defaults/staff';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const seedStaffTask: Task = {
  id: 'staff',
  name: 'Seed Staff Profiles',
  description: 'Seeds RCIC consultant profiles and team bios into Sanity CMS.',
  run: async (ctx: TaskContext) => {
    for (const staff of defaultStaff) {
      await upsertDocument(ctx, {
        _id: staff._id,
        _type: 'staff',
        language: 'en',
        name: staff.name,
        designation: staff.designation,
        role: staff.role,
        subtitle: staff.subtitle,
        email: staff.email,
        order: staff.order,
        bio: staff.bio,
      });
    }
  },
};
