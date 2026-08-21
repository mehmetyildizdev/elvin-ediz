import { defineField } from 'sanity';
import config from './fields.json';

export const testimonialFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    ...(f.placeholder ? { placeholder: f.placeholder } : {}),
    ...(f.type === 'image' ? { options: { hotspot: true } } : {}),
    ...(f.rows ? { rows: f.rows } : {}),
    ...(f.name === 'rating' ? { validation: (rule: any) => rule.min(1).max(5) } : {}),
    ...(f.validation === 'required' ? { validation: (rule: any) => rule.required() } : {}),
    initialValue: f.initialValue,
  })
);
