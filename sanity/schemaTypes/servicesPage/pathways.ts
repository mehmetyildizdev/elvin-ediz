import { defineField } from 'sanity';
import config from './pathways.json';

export const pathwaysGroup = config.group;

export const pathwaysFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    ...(f.rows ? { rows: f.rows } : {}),
    group: config.group.name,
    initialValue: f.initialValue,
  })
);
