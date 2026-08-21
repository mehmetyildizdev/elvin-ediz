import { defineField } from 'sanity';
import config from './fields.json';

export const appointmentFields = [
  defineField({
    name: config.fields.name.name,
    title: config.fields.name.title,
    type: 'string',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: config.fields.email.name,
    title: config.fields.email.title,
    type: 'string',
    validation: (rule) => rule.required().email(),
  }),
  defineField({
    name: config.fields.phone.name,
    title: config.fields.phone.title,
    type: 'string',
  }),
  defineField({
    name: config.fields.service.name,
    title: config.fields.service.title,
    type: 'string',
  }),
  defineField({
    name: config.fields.message.name,
    title: config.fields.message.title,
    type: 'text',
    rows: config.fields.message.rows,
  }),
  defineField({
    name: config.fields.status.name,
    title: config.fields.status.title,
    type: 'string',
    initialValue: config.fields.status.initialValue,
    options: {
      list: [
        { title: '🟢 New (Needs Attention)', value: 'New' },
        { title: '⚪ Contacted (Handled)', value: 'Contacted' },
      ],
      layout: 'radio',
    },
  }),
  defineField({
    name: config.fields.receivedAt.name,
    title: config.fields.receivedAt.title,
    type: 'datetime',
    initialValue: () => new Date().toISOString(),
  }),
];
