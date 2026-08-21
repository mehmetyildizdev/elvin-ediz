import { defineField } from 'sanity';
import config from './news.json';

export const newsSectionGroup = config.group;

export const newsSectionFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    description: f.description,
    ...(f.rows ? { rows: f.rows } : {}),
    group: config.group.name,
    hidden: ({ document }: { document?: any }) => document?.kind !== 'news',
    initialValue: f.initialValue,
  })
);
