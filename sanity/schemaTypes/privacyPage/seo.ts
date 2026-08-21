import { defineField } from 'sanity';
import config from './seo.json';

export const seoGroup = config.group;

export const seoFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    group: config.group.name,
    description: f.description,
  })
);
