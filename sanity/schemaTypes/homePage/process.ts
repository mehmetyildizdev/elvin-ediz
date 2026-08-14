import { defineArrayMember, defineField } from 'sanity';
import config from './process.json';

export const processGroup = config.group;

export const processFields = [
  defineField({
    name: config.fields.processEyebrow.name,
    title: config.fields.processEyebrow.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.processEyebrow.initialValue,
  }),
  defineField({
    name: config.fields.processTitleMain.name,
    title: config.fields.processTitleMain.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.processTitleMain.initialValue,
  }),
  defineField({
    name: config.fields.processTitleAccent.name,
    title: config.fields.processTitleAccent.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.processTitleAccent.initialValue,
  }),
  defineField({
    name: config.fields.processSteps.name,
    title: config.fields.processSteps.title,
    type: 'array',
    group: config.group.name,
    of: [
      defineArrayMember({
        type: 'object',
        name: 'processStep',
        fields: [
          defineField({
            name: config.fields.processSteps.itemNumberName,
            title: config.fields.processSteps.itemNumberTitle,
            type: 'string',
          }),
          defineField({
            name: config.fields.processSteps.itemTitleName,
            title: config.fields.processSteps.itemTitleTitle,
            type: 'string',
            validation: (Rule) => Rule.required().error('Step title is required'),
          }),
          defineField({
            name: config.fields.processSteps.itemTextName,
            title: config.fields.processSteps.itemTextTitle,
            type: 'text',
            rows: 2,
            validation: (Rule) => Rule.required().error('Step description is required'),
          }),
        ],
        preview: {
          select: {
            title: config.fields.processSteps.itemTitleName,
            subtitle: config.fields.processSteps.itemNumberName,
          },
          prepare({ title, subtitle }) {
            return {
              title: `${subtitle || '01'}. ${title || 'Step'}`,
            };
          },
        },
      }),
    ],
    initialValue: config.fields.processSteps.initialValue,
  }),
];
