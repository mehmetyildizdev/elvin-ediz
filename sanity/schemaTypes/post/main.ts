import { defineField } from 'sanity';
import { CodeIcon } from '@sanity/icons/Code';
import config from './main.json';
import { VisualIconPicker } from '../../components/VisualIconPicker';
import { isSlugUniqueByLanguage, slugifyWithI18n } from '../../i18n/schema';

export const mainGroup = config.group;

export const mainFields = [
  defineField({
    name: config.fields.title.name,
    title: config.fields.title.title,
    type: 'string',
    group: config.group.name,
    validation: (rule) => rule.required().max(110),
  }),
  defineField({
    name: config.fields.slug.name,
    title: config.fields.slug.title,
    type: 'slug',
    group: config.group.name,
    options: {
      source: 'title',
      maxLength: 96,
      slugify: slugifyWithI18n,
      isUnique: isSlugUniqueByLanguage,
    },
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: config.fields.kind.name,
    title: config.fields.kind.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.kind.initialValue,
    options: {
      list: [
        { title: 'Insight', value: 'insight' },
        { title: 'News', value: 'news' },
        { title: 'Announcement', value: 'announcement' },
        { title: 'Information', value: 'information' },
      ],
    },
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: config.fields.iconName.name,
    title: config.fields.iconName.title,
    type: 'string',
    group: config.group.name,
    components: {
      input: VisualIconPicker,
    },
  }),
  defineField({
    name: config.fields.category.name,
    title: config.fields.category.title,
    type: 'string',
    group: config.group.name,
    description:
      'e.g. Express Entry & PR, Study in Canada & PGWP, Work Permits & LMIA, Family & Spousal Sponsorship, Provincial Nominee (PNP), Citizenship & Settlement, Canada Living',
  }),
  defineField({
    name: config.fields.excerpt.name,
    title: config.fields.excerpt.title,
    type: 'text',
    group: config.group.name,
    rows: config.fields.excerpt.rows,
    validation: (rule) => rule.max(260),
  }),
  defineField({
    name: config.fields.coverImage.name,
    title: config.fields.coverImage.title,
    type: 'image',
    group: config.group.name,
    options: { hotspot: true },
    fields: [{ name: 'alt', type: 'string', title: 'Image description' }],
  }),
  defineField({
    name: config.fields.content.name,
    title: config.fields.content.title,
    type: 'array',
    group: config.group.name,
    of: [
      { type: 'block' },
      {
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', type: 'string', title: 'Alternative text' },
          { name: 'caption', type: 'string', title: 'Caption' },
        ],
      },
      {
        type: 'object',
        name: 'markdownBlock',
        title: 'Markdown',
        icon: CodeIcon,
        fields: [
          {
            name: 'content',
            type: 'markdown',
            title: 'Markdown Content',
          },
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
  defineField({
    name: config.fields.publishedAt.name,
    title: config.fields.publishedAt.title,
    type: 'datetime',
    group: config.group.name,
    initialValue: () => new Date().toISOString(),
  }),
];
