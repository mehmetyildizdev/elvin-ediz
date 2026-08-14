import { defineField } from 'sanity';
import config from './hero.json';

export const heroGroup = config.group;

export const heroFields = [
  defineField({
    name: config.fields.heroEyebrow.name,
    title: config.fields.heroEyebrow.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.heroEyebrow.initialValue,
  }),
  defineField({
    name: config.fields.heroTitle.name,
    title: config.fields.heroTitle.title,
    description: config.fields.heroTitle.description,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.heroTitle.initialValue,
  }),
  defineField({
    name: config.fields.heroSubtitle.name,
    title: config.fields.heroSubtitle.title,
    type: 'text',
    rows: config.fields.heroSubtitle.rows,
    group: config.group.name,
    initialValue: config.fields.heroSubtitle.initialValue,
  }),
  defineField({
    name: config.fields.heroPrimaryCtaText.name,
    title: config.fields.heroPrimaryCtaText.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.heroPrimaryCtaText.initialValue,
  }),
  defineField({
    name: config.fields.heroPrimaryCtaLink.name,
    title: config.fields.heroPrimaryCtaLink.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.heroPrimaryCtaLink.initialValue,
  }),
  defineField({
    name: config.fields.heroSecondaryCtaText.name,
    title: config.fields.heroSecondaryCtaText.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.heroSecondaryCtaText.initialValue,
  }),
  defineField({
    name: config.fields.heroSecondaryCtaLink.name,
    title: config.fields.heroSecondaryCtaLink.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.heroSecondaryCtaLink.initialValue,
  }),
  defineField({
    name: config.fields.badgeText.name,
    title: config.fields.badgeText.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.badgeText.initialValue,
  }),
];
