import { defineField } from 'sanity';
import config from './insight.json';
import { VisualIconPicker } from '../../components/VisualIconPicker';

export const insightSectionGroup = config.group;

export const insightSectionFields = [
  defineField({
    name: config.fields.authorOversightIcon.name,
    title: config.fields.authorOversightIcon.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'insight',
    initialValue: config.fields.authorOversightIcon.initialValue,
    components: {
      input: VisualIconPicker,
    },
  }),
  defineField({
    name: config.fields.authorOversightTitle.name,
    title: config.fields.authorOversightTitle.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'insight',
    initialValue: config.fields.authorOversightTitle.initialValue,
  }),
  defineField({
    name: config.fields.authorOversightSubtitle.name,
    title: config.fields.authorOversightSubtitle.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'insight',
    initialValue: config.fields.authorOversightSubtitle.initialValue,
  }),
  defineField({
    name: config.fields.authorOversightText.name,
    title: config.fields.authorOversightText.title,
    type: 'text',
    rows: config.fields.authorOversightText.rows,
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'insight',
    initialValue: config.fields.authorOversightText.initialValue,
  }),
  defineField({
    name: config.fields.authorOversightCtaText.name,
    title: config.fields.authorOversightCtaText.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'insight',
    initialValue: config.fields.authorOversightCtaText.initialValue,
  }),
  defineField({
    name: config.fields.authorOversightCtaLink.name,
    title: config.fields.authorOversightCtaLink.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'insight',
    initialValue: config.fields.authorOversightCtaLink.initialValue,
  }),
];
