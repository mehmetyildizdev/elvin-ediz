import { defineField } from 'sanity';
import config from './announcements.json';

export const announcementsGroup = config.group;

export const announcementsFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    ...(f.rows ? { rows: f.rows } : {}),
    group: config.group.name,
    initialValue: f.initialValue,
  })
);
