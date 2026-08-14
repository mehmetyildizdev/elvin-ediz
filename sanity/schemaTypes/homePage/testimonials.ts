import { defineField } from 'sanity';
import config from './testimonials.json';

export const testimonialsGroup = config.group;

export const testimonialsFields = [
  defineField({
    name: config.fields.testimonialsEyebrow.name,
    title: config.fields.testimonialsEyebrow.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.testimonialsEyebrow.initialValue,
  }),
  defineField({
    name: config.fields.testimonialsTitleMain.name,
    title: config.fields.testimonialsTitleMain.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.testimonialsTitleMain.initialValue,
  }),
  defineField({
    name: config.fields.testimonialsTitleAccent.name,
    title: config.fields.testimonialsTitleAccent.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.testimonialsTitleAccent.initialValue,
  }),
];
