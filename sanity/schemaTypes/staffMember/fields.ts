import { defineField } from 'sanity';
import config from './fields.json';

export const staffMemberFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    ...(f.type === 'image' ? { options: { hotspot: true } } : {}),
    ...(f.rows ? { rows: f.rows } : {}),
    ...(f.validation === 'required' ? { validation: (rule: any) => rule.required() } : {}),
    initialValue: f.initialValue,
  })
);
