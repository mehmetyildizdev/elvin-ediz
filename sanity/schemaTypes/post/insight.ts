import { defineField } from 'sanity';
import config from './insight.json';
import { VisualIconPicker } from '../../components/VisualIconPicker';

export const insightSectionGroup = config.group;

export const insightSectionFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    description: f.description,
    ...(f.rows ? { rows: f.rows } : {}),
    ...(f.name.toLowerCase().includes('icon') ? { components: { input: VisualIconPicker } } : {}),
    group: config.group.name,
    hidden: ({ document }: { document?: any }) => document?.kind !== 'insight',
    initialValue: f.initialValue,
  })
);
