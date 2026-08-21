import { defineField } from 'sanity';
import config from './hero.json';

export const heroGroup = config.group;

export const heroFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    description: f.description,
    type: f.type,
    ...(f.rows ? { rows: f.rows } : {}),
    group: config.group.name,
    initialValue: f.initialValue,
  })
);
