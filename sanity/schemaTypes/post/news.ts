import { defineField } from 'sanity';
import config from './news.json';

export const newsSectionGroup = config.group;

export const newsSectionFields = [
  defineField({
    name: config.fields.sourceName.name,
    title: config.fields.sourceName.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'news',
    initialValue: config.fields.sourceName.initialValue,
    description: 'Publisher or source outlet (e.g. CBC News, Global News, Financial Post, Daily Hive, Reuters)',
  }),
  defineField({
    name: config.fields.sourceURL.name,
    title: config.fields.sourceURL.title,
    type: 'url',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'news',
    description: 'External link to the full original news story / source article',
  }),
  defineField({
    name: config.fields.readTime.name,
    title: config.fields.readTime.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'news',
    initialValue: config.fields.readTime.initialValue,
    description: 'e.g. 3 min read, 5 min read',
  }),
  defineField({
    name: config.fields.editorialNote.name,
    title: config.fields.editorialNote.title,
    type: 'text',
    rows: config.fields.editorialNote.rows,
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'news',
    initialValue: config.fields.editorialNote.initialValue,
    description: 'Optional 1-2 sentence perspective or note from Elvin Ediz Immigration team',
  }),
];
