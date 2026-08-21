import { defineArrayMember, defineField } from 'sanity';
import { CodeIcon } from '@sanity/icons/Code';
import config from './faqs.json';

export const faqsGroup = config.group;

export const faqsFields = [
  defineField({
    name: config.fields.items.name,
    title: config.fields.items.title,
    type: 'array',
    group: config.group.name,
    of: [
      defineArrayMember({
        type: 'object',
        name: 'faqItem',
        title: 'Question & Answer',
        fields: [
          defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'category',
            title: 'Category / Topic Tag',
            description:
              'Optional topic tag (e.g. Express Entry, Study Permits, General, Sponsorship)',
            type: 'string',
          }),
          defineField({
            name: 'answer',
            title: 'Answer (Rich Content / Portable Text)',
            description: 'Format your answer with bolding, lists, links, or paragraphs.',
            type: 'array',
            of: [
              defineArrayMember({
                type: 'block',
                styles: [
                  { title: 'Normal', value: 'normal' },
                  { title: 'H4', value: 'h4' },
                  { title: 'H5', value: 'h5' },
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
            validation: (rule) => rule.required(),
          }),
        ],
        preview: {
          select: {
            title: 'question',
            subtitle: 'category',
          },
          prepare({ title, subtitle }) {
            return {
              title: title || 'Untitled Question',
              subtitle: subtitle ? `[${subtitle}]` : 'Q&A Item',
            };
          },
        },
      }),
    ],
  }),
];
