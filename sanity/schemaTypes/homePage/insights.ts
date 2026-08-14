import { defineField } from 'sanity';
import config from './insights.json';

export const insightsGroup = config.group;

export const insightsFields = [
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
    name: config.fields.insightsViewAllText.name,
    title: config.fields.insightsViewAllText.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.insightsViewAllText.initialValue,
  }),
  defineField({
    name: config.fields.insightsViewAllLink.name,
    title: config.fields.insightsViewAllLink.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.insightsViewAllLink.initialValue,
  }),
];
