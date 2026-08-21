import { defineArrayMember, defineField } from 'sanity';
import config from './information.json';
import { VisualIconPicker } from '../../components/VisualIconPicker';

export const informationSectionGroup = config.group;

export const informationSectionFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    description: f.description,
    ...(f.type === 'array' ? { of: [defineArrayMember({ type: 'string' })] } : {}),
    ...(f.rows ? { rows: f.rows } : {}),
    ...(f.name.toLowerCase().includes('icon') ? { components: { input: VisualIconPicker } } : {}),
    group: config.group.name,
    hidden: ({ document }: { document?: any }) => document?.kind !== 'information',
    initialValue: f.initialValue,
  })
);
