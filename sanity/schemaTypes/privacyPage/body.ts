import { defineArrayMember, defineField } from 'sanity';
import { CodeIcon } from '@sanity/icons/Code';
import config from './body.json';

export const bodyGroup = config.group;

export const bodyFields = [
  defineField({
    name: config.fields.content.name,
    title: config.fields.content.title,
    type: 'array',
    group: config.group.name,
    of: [
      defineArrayMember({
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'H3', value: 'h3' },
          { title: 'H4', value: 'h4' },
          { title: 'Quote', value: 'blockquote' },
        ],
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' },
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Underline', value: 'underline' },
            { title: 'Code', value: 'code' },
          ],
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'External Link',
              fields: [
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL',
                  validation: (Rule) =>
                    Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel'],
                    }),
                },
              ],
            },
          ],
        },
      }),
      defineArrayMember({
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', type: 'string', title: 'Image description' },
          { name: 'caption', type: 'string', title: 'Caption' },
        ],
      }),
      defineArrayMember({
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
      }),
    ],
  }),
];
