import { defineField } from 'sanity';
import config from './news.json';

export const newsGroup = config.group;

export const newsFields = [
  defineField({
    name: config.fields.newsEyebrow.name,
    title: config.fields.newsEyebrow.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.newsEyebrow.initialValue,
  }),
  defineField({
    name: config.fields.newsTitle.name,
    title: config.fields.newsTitle.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.newsTitle.initialValue,
  }),
  defineField({
    name: config.fields.newsEmptyMessage.name,
    title: config.fields.newsEmptyMessage.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.newsEmptyMessage.initialValue,
  }),
];
