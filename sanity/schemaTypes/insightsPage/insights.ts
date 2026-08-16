import { defineField } from 'sanity';
import config from './insights.json';

export const insightsSectionGroup = config.group;

export const insightsSectionFields = [
  defineField({
    name: config.fields.insightsEyebrow.name,
    title: config.fields.insightsEyebrow.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.insightsEyebrow.initialValue,
  }),
  defineField({
    name: config.fields.insightsTitleMain.name,
    title: config.fields.insightsTitleMain.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.insightsTitleMain.initialValue,
  }),
  defineField({
    name: config.fields.insightsTitleAccent.name,
    title: config.fields.insightsTitleAccent.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.insightsTitleAccent.initialValue,
  }),
  defineField({
    name: config.fields.insightsDescription.name,
    title: config.fields.insightsDescription.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.insightsDescription.initialValue,
  }),
];
