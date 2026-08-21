import { defineField } from 'sanity';
import { CodeIcon } from '@sanity/icons/Code';
import config from './body.json';

export const bodyGroup = config.group;

export const bodyFields = [
  defineField({
    name: config.fields.coverImage.name,
    title: config.fields.coverImage.title,
    type: 'image',
    group: config.group.name,
    options: { hotspot: true },
  }),
  defineField({
    name: config.fields.body.name,
    title: config.fields.body.title,
    type: 'array',
    group: config.group.name,
    of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true } },
      {
        type: 'object',
        name: 'markdownBlock',
        title: 'Markdown',
        icon: CodeIcon,
        fields: [
          defineField({
            name: 'content',
            type: 'markdown',
            title: 'Markdown Content',
          }),
        ],
        preview: {
          select: {
            content: 'content',
          },
          prepare({ content }) {
            return {
              title: 'Markdown Block',
              subtitle: content ? content.slice(0, 60) : 'Empty markdown content',
              media: CodeIcon,
            };
          },
        },
      },
    ],
  }),
];
