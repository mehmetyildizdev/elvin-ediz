import { defineField } from 'sanity';
import config from './announcement.json';
import { VisualIconPicker } from '../../components/VisualIconPicker';

export const announcementSectionGroup = config.group;

export const announcementSectionFields = [
  defineField({
    name: config.fields.effectiveDate.name,
    title: config.fields.effectiveDate.title,
    type: 'date',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'announcement',
    description: 'The date this announcement/policy officially takes effect (e.g. 2026-06-01)',
  }),
  defineField({
    name: config.fields.announcementNoticeIcon.name,
    title: config.fields.announcementNoticeIcon.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'announcement',
    initialValue: config.fields.announcementNoticeIcon.initialValue,
    components: {
      input: VisualIconPicker,
    },
  }),
  defineField({
    name: config.fields.announcementNoticeEyebrow.name,
    title: config.fields.announcementNoticeEyebrow.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'announcement',
    initialValue: config.fields.announcementNoticeEyebrow.initialValue,
  }),
  defineField({
    name: config.fields.announcementNoticeTitle.name,
    title: config.fields.announcementNoticeTitle.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'announcement',
    initialValue: config.fields.announcementNoticeTitle.initialValue,
  }),
  defineField({
    name: config.fields.announcementActionTitle.name,
    title: config.fields.announcementActionTitle.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'announcement',
    initialValue: config.fields.announcementActionTitle.initialValue,
  }),
  defineField({
    name: config.fields.announcementActionText.name,
    title: config.fields.announcementActionText.title,
    type: 'text',
    rows: config.fields.announcementActionText.rows,
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'announcement',
    initialValue: config.fields.announcementActionText.initialValue,
  }),
  defineField({
    name: config.fields.announcementCtaButtonText.name,
    title: config.fields.announcementCtaButtonText.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'announcement',
    initialValue: config.fields.announcementCtaButtonText.initialValue,
  }),
  defineField({
    name: config.fields.announcementCtaButtonLink.name,
    title: config.fields.announcementCtaButtonLink.title,
    type: 'string',
    group: config.group.name,
    hidden: ({ document }) => document?.kind !== 'announcement',
    initialValue: config.fields.announcementCtaButtonLink.initialValue,
  }),
];
