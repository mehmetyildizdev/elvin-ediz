import { defineArrayMember, defineField } from 'sanity';
import { VisualIconPicker } from '../../components/VisualIconPicker';
import config from './trustBar.json';

export const trustBarGroup = config.group;

export const trustBarFields = Object.values(config.fields).map((f: any) =>
  defineField({
    name: f.name,
    title: f.title,
    description: f.description,
    type: 'array',
    group: config.group.name,
    of: [
      defineArrayMember({
        type: 'object',
        name: 'trustItem',
        fields: [
          defineField({
            name: f.itemNumberName,
            title: f.itemNumberTitle,
            type: 'string',
          }),
          defineField({
            name: f.itemIconName,
            title: f.itemIconTitle,
            type: 'string',
            components: {
              input: VisualIconPicker,
            },
          }),
          defineField({
            name: f.itemTextName,
            title: f.itemTextTitle,
            type: 'string',
            validation: (Rule) => Rule.required().error('Badge label is required'),
          }),
        ],
        preview: {
          select: {
            title: f.itemTextName,
            subtitle: f.itemNumberName,
            icon: f.itemIconName,
          },
          prepare({ title, subtitle, icon }) {
            return {
              title: title || 'Badge Item',
              subtitle: `${subtitle || '01'} ${icon && icon !== 'none' ? `[${icon}]` : ''}`,
            };
          },
        },
      }),
    ],
    initialValue: f.initialValue,
  })
);
