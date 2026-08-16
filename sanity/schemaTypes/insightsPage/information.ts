import { defineField } from 'sanity';
import config from './information.json';

export const informationGroup = config.group;

export const informationFields = [
  defineField({
    name: config.fields.infoEyebrow.name,
    title: config.fields.infoEyebrow.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.infoEyebrow.initialValue,
  }),
  defineField({
    name: config.fields.infoTitleMain.name,
    title: config.fields.infoTitleMain.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.infoTitleMain.initialValue,
  }),
  defineField({
    name: config.fields.infoTitleAccent.name,
    title: config.fields.infoTitleAccent.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.infoTitleAccent.initialValue,
  }),
  defineField({
    name: config.fields.infoDescription.name,
    title: config.fields.infoDescription.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.infoDescription.initialValue,
  }),
];
