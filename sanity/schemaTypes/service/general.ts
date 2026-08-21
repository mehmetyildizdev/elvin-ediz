import { defineField } from 'sanity';
import config from './general.json';
import { VisualIconPicker } from '../../components/VisualIconPicker';
import { isSlugUniqueByLanguage, slugifyWithI18n } from '../../i18n/schema';

export const generalGroup = config.group;

export const generalFields = [
  defineField({
    name: config.fields.title.name,
    title: config.fields.title.title,
    type: 'string',
    group: config.group.name,
    validation: (rule) => rule.required(),
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
    name: config.fields.order.name,
    title: config.fields.order.title,
    type: 'number',
    group: config.group.name,
    initialValue: config.fields.order.initialValue,
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
    name: config.fields.summary.name,
    title: config.fields.summary.title,
    type: 'text',
    group: config.group.name,
    rows: config.fields.summary.rows,
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: config.fields.features.name,
    title: config.fields.features.title,
    type: 'array',
    group: config.group.name,
    of: [{ type: 'string' }],
  }),
];
