import { defineField } from 'sanity';
import config from './services.json';

export const servicesGroup = config.group;

export const servicesFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    ...(f.rows ? { rows: f.rows } : {}),
    group: config.group.name,
    initialValue: f.initialValue,
  })
);
