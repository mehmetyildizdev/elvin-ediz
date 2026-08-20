import { defineField } from 'sanity';
import config from './seo.json';

export const seoGroup = config.group;

export const seoFields = [
  defineField({
    name: config.fields.seo.name,
    title: config.fields.seo.title,
    type: config.fields.seo.type,
    group: config.group.name,
    description: config.fields.seo.description,
  }),
];
