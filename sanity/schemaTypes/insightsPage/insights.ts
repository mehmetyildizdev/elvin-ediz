import { defineField } from 'sanity';
import config from './insights.json';

export const insightsSectionGroup = config.group;

export const insightsSectionFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    ...(f.rows ? { rows: f.rows } : {}),
    group: config.group.name,
    initialValue: f.initialValue,
  })
);
