import { defineField } from 'sanity';
import config from './cta.json';

export const ctaGroup = config.group;

export const ctaFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    description: f.description,
    ...(f.rows ? { rows: f.rows } : {}),
    group: config.group.name,
    initialValue: f.initialValue,
  })
);
