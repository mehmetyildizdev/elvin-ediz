import { defineArrayMember, defineField } from 'sanity';
import { VisualIconPicker } from '../../components/VisualIconPicker';
import config from './trustBar.json';

export const trustBarGroup = config.group;

export const trustBarFields = [
  defineField({
    name: config.fields.trustBarItems.name,
    title: config.fields.trustBarItems.title,
    description: config.fields.trustBarItems.description,
    type: 'array',
    group: config.group.name,
    of: [
      defineArrayMember({
        type: 'object',
        name: 'trustItem',
        fields: [
          defineField({
            name: config.fields.trustBarItems.itemNumberName,
            title: config.fields.trustBarItems.itemNumberTitle,
            type: 'string',
          }),
          defineField({
            name: config.fields.trustBarItems.itemIconName,
            title: config.fields.trustBarItems.itemIconTitle,
            type: 'string',
            components: {
              input: VisualIconPicker,
            },
          }),
          defineField({
            name: config.fields.trustBarItems.itemTextName,
            title: config.fields.trustBarItems.itemTextTitle,
            type: 'string',
            validation: (Rule) => Rule.required().error('Badge label is required'),
          }),
        ],
        preview: {
          select: {
            title: config.fields.trustBarItems.itemTextName,
            subtitle: config.fields.trustBarItems.itemNumberName,
            icon: config.fields.trustBarItems.itemIconName,
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
    initialValue: config.fields.trustBarItems.initialValue,
  }),
];
