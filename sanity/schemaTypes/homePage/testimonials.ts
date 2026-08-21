import { defineField } from 'sanity';
import config from './testimonials.json';

export const testimonialsGroup = config.group;

export const testimonialsFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    ...(f.rows ? { rows: f.rows } : {}),
    group: config.group.name,
    initialValue: f.initialValue,
  })
);
