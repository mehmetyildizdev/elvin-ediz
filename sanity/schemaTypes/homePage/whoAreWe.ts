import { defineArrayMember, defineField } from 'sanity';
import { VisualIconPicker } from '../../components/VisualIconPicker';
import config from './whoAreWe.json';

export const whoAreWeGroup = config.group;

export const whoAreWeFields = [
  defineField({
    name: config.fields.strategyEyebrow.name,
    title: config.fields.strategyEyebrow.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.strategyEyebrow.initialValue,
  }),
  defineField({
    name: config.fields.strategyTitle.name,
    title: config.fields.strategyTitle.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.strategyTitle.initialValue,
  }),
  defineField({
    name: config.fields.strategyParagraph1.name,
    title: config.fields.strategyParagraph1.title,
    type: 'text',
    rows: config.fields.strategyParagraph1.rows,
    group: config.group.name,
    initialValue: config.fields.strategyParagraph1.initialValue,
  }),
  defineField({
    name: config.fields.strategyParagraph2.name,
    title: config.fields.strategyParagraph2.title,
    type: 'text',
    rows: config.fields.strategyParagraph2.rows,
    group: config.group.name,
    initialValue: config.fields.strategyParagraph2.initialValue,
  }),
  defineField({
    name: config.fields.whoAreWePrimaryCtaText.name,
    title: config.fields.whoAreWePrimaryCtaText.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.whoAreWePrimaryCtaText.initialValue,
  }),
  defineField({
    name: config.fields.whoAreWePrimaryCtaLink.name,
    title: config.fields.whoAreWePrimaryCtaLink.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.whoAreWePrimaryCtaLink.initialValue,
  }),
  defineField({
    name: config.fields.whoAreWeSecondaryCtaText.name,
    title: config.fields.whoAreWeSecondaryCtaText.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.whoAreWeSecondaryCtaText.initialValue,
  }),
  defineField({
    name: config.fields.whoAreWeSecondaryCtaLink.name,
    title: config.fields.whoAreWeSecondaryCtaLink.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.whoAreWeSecondaryCtaLink.initialValue,
  }),
  defineField({
    name: config.fields.ciccBadgeImage.name,
    title: config.fields.ciccBadgeImage.title,
    description: config.fields.ciccBadgeImage.description,
    type: 'image',
    options: { hotspot: true },
    group: config.group.name,
  }),
  defineField({
    name: config.fields.ciccBadgeTitle.name,
    title: config.fields.ciccBadgeTitle.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.ciccBadgeTitle.initialValue,
  }),
  defineField({
    name: config.fields.ciccBadgeSubtitle.name,
    title: config.fields.ciccBadgeSubtitle.title,
    type: 'text',
    rows: config.fields.ciccBadgeSubtitle.rows,
    group: config.group.name,
    initialValue: config.fields.ciccBadgeSubtitle.initialValue,
  }),
  defineField({
    name: config.fields.stats.name,
    title: config.fields.stats.title,
    type: 'array',
    group: config.group.name,
    of: [
      defineArrayMember({
        type: 'object',
        name: 'statItem',
        fields: [
          defineField({
            name: config.fields.stats.itemNumberName,
            title: config.fields.stats.itemNumberTitle,
            type: 'string',
            validation: (Rule) => Rule.required().error('Stat number is required'),
          }),
          defineField({
            name: config.fields.stats.itemLabelName,
            title: config.fields.stats.itemLabelTitle,
            type: 'string',
            validation: (Rule) => Rule.required().error('Stat label is required'),
          }),
          defineField({
            name: config.fields.stats.itemIconName,
            title: config.fields.stats.itemIconTitle,
            type: 'string',
            components: {
              input: VisualIconPicker,
            },
          }),
        ],
        preview: {
          select: {
            title: config.fields.stats.itemNumberName,
            subtitle: config.fields.stats.itemLabelName,
            icon: config.fields.stats.itemIconName,
          },
          prepare({ title, subtitle, icon }) {
            return {
              title: title || 'Stat',
              subtitle: `${subtitle || ''} [${icon || 'default'}]`,
            };
          },
        },
      }),
    ],
    initialValue: config.fields.stats.initialValue,
  }),
];
