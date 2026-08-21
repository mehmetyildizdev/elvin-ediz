import { defineField } from 'sanity';
import config from './inquiry.json';

export const inquiryGroup = config.group;

export const inquiryFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    ...(f.rows ? { rows: f.rows } : {}),
    group: config.group.name,
    initialValue: f.initialValue,
  })
);
