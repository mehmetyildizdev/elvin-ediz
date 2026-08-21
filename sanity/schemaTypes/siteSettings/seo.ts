import { defineArrayMember, defineField } from 'sanity';
import config from './seo.json';

export const seoGroup = config.group;

export const seoFields = Object.values(config.fields).map((f: any) => {
  if (f.name === 'siteKeywords') {
    return defineField({
      name: f.name,
      title: f.title,
      type: 'array',
      group: config.group.name,
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      initialValue: f.initialValue,
      description: f.description,
    });
  }

  return defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    ...(f.type === 'image' ? { options: { hotspot: true } } : {}),
    ...(f.rows ? { rows: f.rows } : {}),
    group: config.group.name,
    description: f.description,
    initialValue: f.initialValue,
  });
});
