import { defineField } from 'sanity';
import config from './strategy.json';

export const strategyGroup = config.group;

export const strategyFields = [
  defineField({
    name: config.fields.aboutEyebrow.name,
    title: config.fields.aboutEyebrow.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.aboutEyebrow.initialValue,
  }),
  defineField({
    name: config.fields.aboutTitleMain.name,
    title: config.fields.aboutTitleMain.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.aboutTitleMain.initialValue,
  }),
  defineField({
    name: config.fields.aboutTitleAccent.name,
    title: config.fields.aboutTitleAccent.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.aboutTitleAccent.initialValue,
  }),
  defineField({
    name: config.fields.aboutQuoteParagraph.name,
    title: config.fields.aboutQuoteParagraph.title,
    type: 'text',
    rows: config.fields.aboutQuoteParagraph.rows,
    group: config.group.name,
    initialValue: config.fields.aboutQuoteParagraph.initialValue,
  }),
  defineField({
    name: config.fields.aboutBodyParagraph.name,
    title: config.fields.aboutBodyParagraph.title,
    type: 'text',
    rows: config.fields.aboutBodyParagraph.rows,
    group: config.group.name,
    initialValue: config.fields.aboutBodyParagraph.initialValue,
  }),
  defineField({
    name: config.fields.aboutCtaText.name,
    title: config.fields.aboutCtaText.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.aboutCtaText.initialValue,
  }),
  defineField({
    name: config.fields.aboutCtaLink.name,
    title: config.fields.aboutCtaLink.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.aboutCtaLink.initialValue,
  }),
];
