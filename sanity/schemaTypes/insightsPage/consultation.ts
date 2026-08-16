import { defineField } from 'sanity';
import config from './consultation.json';

export const consultationGroup = config.group;

export const consultationFields = [
  defineField({
    name: config.fields.consultationEyebrow.name,
    title: config.fields.consultationEyebrow.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.consultationEyebrow.initialValue,
  }),
  defineField({
    name: config.fields.consultationTitle.name,
    title: config.fields.consultationTitle.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.consultationTitle.initialValue,
  }),
  defineField({
    name: config.fields.consultationDescription.name,
    title: config.fields.consultationDescription.title,
    type: 'text',
    rows: config.fields.consultationDescription.rows,
    group: config.group.name,
    initialValue: config.fields.consultationDescription.initialValue,
  }),
  defineField({
    name: config.fields.consultationButtonText.name,
    title: config.fields.consultationButtonText.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.consultationButtonText.initialValue,
  }),
  defineField({
    name: config.fields.consultationButtonLink.name,
    title: config.fields.consultationButtonLink.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.consultationButtonLink.initialValue,
  }),
];
