import { defineArrayMember, defineField } from 'sanity';
import config from './contact.json';

export const contactGroup = config.group;

export const contactFields = [
  defineField({
    name: config.fields.contactEyebrow.name,
    title: config.fields.contactEyebrow.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.contactEyebrow.initialValue,
  }),
  defineField({
    name: config.fields.contactTitleMain.name,
    title: config.fields.contactTitleMain.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.contactTitleMain.initialValue,
  }),
  defineField({
    name: config.fields.contactTitleAccent.name,
    title: config.fields.contactTitleAccent.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.contactTitleAccent.initialValue,
  }),
  defineField({
    name: config.fields.contactDescription.name,
    title: config.fields.contactDescription.title,
    type: 'text',
    rows: config.fields.contactDescription.rows,
    group: config.group.name,
    initialValue: config.fields.contactDescription.initialValue,
  }),
  defineField({
    name: config.fields.contactSubmitButtonText.name,
    title: config.fields.contactSubmitButtonText.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.contactSubmitButtonText.initialValue,
  }),
  defineField({
    name: config.fields.contactDisclaimer.name,
    title: config.fields.contactDisclaimer.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.contactDisclaimer.initialValue,
  }),
];
