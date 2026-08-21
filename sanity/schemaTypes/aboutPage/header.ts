import { defineField } from 'sanity';
import config from './header.json';

export const headerGroup = config.group;

export const headerFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    ...(f.rows ? { rows: f.rows } : {}),
    group: config.group.name,
    initialValue: f.initialValue,
  })
);
