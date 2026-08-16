import { defineArrayMember, defineField } from 'sanity';
import config from './information.json';
import { VisualIconPicker } from '../../components/VisualIconPicker';

export const informationSectionGroup = config.group;

export const informationSectionFields = [
  defineField({
    name: config.fields.checklistIcon.name,
    title: config.fields.checklistIcon.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'information',
    initialValue: config.fields.checklistIcon.initialValue,
    components: {
      input: VisualIconPicker,
    },
  }),
  defineField({
    name: config.fields.checklistTitle.name,
    title: config.fields.checklistTitle.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'information',
    initialValue: config.fields.checklistTitle.initialValue,
  }),
  defineField({
    name: config.fields.checklistDescription.name,
    title: config.fields.checklistDescription.title,
    type: 'text',
    rows: config.fields.checklistDescription.rows,
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'information',
    initialValue: config.fields.checklistDescription.initialValue,
  }),
  defineField({
    name: config.fields.checklistItems.name,
    title: config.fields.checklistItems.title,
    type: 'array',
    of: [defineArrayMember({ type: 'string' })],
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'information',
    initialValue: config.fields.checklistItems.initialValue,
  }),
  defineField({
    name: config.fields.infoCtaTitle.name,
    title: config.fields.infoCtaTitle.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'information',
    initialValue: config.fields.infoCtaTitle.initialValue,
  }),
  defineField({
    name: config.fields.infoCtaSubtitle.name,
    title: config.fields.infoCtaSubtitle.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'information',
    initialValue: config.fields.infoCtaSubtitle.initialValue,
  }),
  defineField({
    name: config.fields.infoCtaButtonText.name,
    title: config.fields.infoCtaButtonText.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'information',
    initialValue: config.fields.infoCtaButtonText.initialValue,
  }),
  defineField({
    name: config.fields.infoCtaButtonLink.name,
    title: config.fields.infoCtaButtonLink.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'information',
    initialValue: config.fields.infoCtaButtonLink.initialValue,
  }),
];
