import { defineField } from 'sanity';
import config from './services.json';

export const servicesGroup = config.group;

export const servicesFields = [
  defineField({
    name: config.fields.servicesEyebrow.name,
    title: config.fields.servicesEyebrow.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.servicesEyebrow.initialValue,
  }),
  defineField({
    name: config.fields.servicesTitleMain.name,
    title: config.fields.servicesTitleMain.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.servicesTitleMain.initialValue,
  }),
  defineField({
    name: config.fields.servicesTitleAccent.name,
    title: config.fields.servicesTitleAccent.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.servicesTitleAccent.initialValue,
  }),
  defineField({
    name: config.fields.servicesDescription.name,
    title: config.fields.servicesDescription.title,
    type: 'text',
    rows: config.fields.servicesDescription.rows,
    group: config.group.name,
    initialValue: config.fields.servicesDescription.initialValue,
  }),
  defineField({
    name: config.fields.servicesViewAllText.name,
    title: config.fields.servicesViewAllText.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.servicesViewAllText.initialValue,
  }),
  defineField({
    name: config.fields.servicesViewAllLink.name,
    title: config.fields.servicesViewAllLink.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.servicesViewAllLink.initialValue,
  }),
];
