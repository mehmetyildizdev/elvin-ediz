import { defineField } from 'sanity';
import config from './author.json';

export const authorGroup = config.group;

export const authorFields = [
  defineField({
    name: config.fields.author.name,
    title: config.fields.author.title,
    type: 'reference',
    to: [{ type: 'staffMember' }],
    group: config.group.name,
    description: 'Select an authorized RCIC consultant or team member from Staff',
  }),
  defineField({
    name: config.fields.customAuthorName.name,
    title: config.fields.customAuthorName.title,
    type: 'string',
    group: config.group.name,
    description: 'Optional override if not selecting from Staff (e.g. Guest Advisory)',
  }),
  defineField({
    name: config.fields.customAuthorRole.name,
    title: config.fields.customAuthorRole.title,
    type: 'string',
    group: config.group.name,
    description: 'Optional override for author title/credentials',
  }),
];
