import { defineField } from 'sanity';
import config from './header.json';

export const headerGroup = config.group;

export const headerFields = [
  defineField({
    name: config.fields.eyebrow.name,
    title: config.fields.eyebrow.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.eyebrow.initialValue,
  }),
  defineField({
    name: config.fields.titleMain.name,
    title: config.fields.titleMain.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.titleMain.initialValue,
  }),
  defineField({
    name: config.fields.titleAccent.name,
    title: config.fields.titleAccent.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.titleAccent.initialValue,
  }),
  defineField({
    name: config.fields.description.name,
    title: config.fields.description.title,
    type: 'text',
    rows: config.fields.description.rows,
    group: config.group.name,
    initialValue: config.fields.description.initialValue,
  }),
];
