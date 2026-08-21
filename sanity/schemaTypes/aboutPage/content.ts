import { defineArrayMember, defineField } from 'sanity';
import config from './content.json';

export const contentGroup = config.group;

export const contentFields = Object.values(config.fields).map((f: any) => {
  if (f.name === 'credentials') {
    return defineField({
      name: f.name,
      title: f.title,
      type: 'array',
      group: config.group.name,
      of: [defineArrayMember({ type: 'string' })],
    });
  }

  return defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    ...(f.type === 'image' ? { options: { hotspot: true } } : {}),
    ...(f.rows ? { rows: f.rows } : {}),
    group: config.group.name,
    initialValue: f.initialValue,
  });
});
