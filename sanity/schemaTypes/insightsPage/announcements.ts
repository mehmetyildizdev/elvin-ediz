import { defineField } from 'sanity';
import config from './announcements.json';

export const announcementsGroup = config.group;

export const announcementsFields = [
  defineField({
    name: config.fields.announcementsEyebrow.name,
    title: config.fields.announcementsEyebrow.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.announcementsEyebrow.initialValue,
  }),
  defineField({
    name: config.fields.announcementsTitle.name,
    title: config.fields.announcementsTitle.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.announcementsTitle.initialValue,
  }),
  defineField({
    name: config.fields.announcementsEmptyMessage.name,
    title: config.fields.announcementsEmptyMessage.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.announcementsEmptyMessage.initialValue,
  }),
];
