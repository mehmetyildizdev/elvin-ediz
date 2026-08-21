import { defineArrayMember, defineField } from 'sanity';
import { VisualIconPicker } from '../../components/VisualIconPicker';
import config from './whoAreWe.json';

export const whoAreWeGroup = config.group;

export const whoAreWeFields = Object.values(config.fields).map((f: any) => {
  if (f.name === 'stats') {
    return defineField({
      name: f.name,
      title: f.title,
      type: 'array',
      group: config.group.name,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'statItem',
          fields: [
            defineField({
              name: f.itemNumberName,
              title: f.itemNumberTitle,
              type: 'string',
              validation: (Rule) => Rule.required().error('Stat number is required'),
            }),
            defineField({
              name: f.itemLabelName,
              title: f.itemLabelTitle,
              type: 'string',
              validation: (Rule) => Rule.required().error('Stat label is required'),
            }),
            defineField({
              name: f.itemIconName,
              title: f.itemIconTitle,
              type: 'string',
              components: {
                input: VisualIconPicker,
              },
            }),
          ],
          preview: {
            select: {
              title: f.itemNumberName,
              subtitle: f.itemLabelName,
              icon: f.itemIconName,
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
      initialValue: f.initialValue,
    });
  }

  return defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    ...(f.type === 'image' ? { options: { hotspot: true } } : {}),
    ...(f.rows ? { rows: f.rows } : {}),
    group: config.group.name,
    initialValue: f.initialValue,
  });
});
