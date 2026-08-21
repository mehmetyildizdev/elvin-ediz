import { defineField } from 'sanity';
import config from './general.json';

export const generalGroup = config.group;

export const generalFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    group: config.group.name,
    initialValue: f.initialValue,
  })
);
