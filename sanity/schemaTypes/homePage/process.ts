import { defineArrayMember, defineField } from 'sanity';
import config from './process.json';

export const processGroup = config.group;

export const processFields = Object.values(config.fields).map((f: any) => {
  if (f.name === 'processSteps') {
    return defineField({
      name: f.name,
      title: f.title,
      type: 'array',
      group: config.group.name,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'processStep',
          fields: [
            defineField({
              name: f.itemNumberName,
              title: f.itemNumberTitle,
              type: 'string',
            }),
            defineField({
              name: f.itemTitleName,
              title: f.itemTitleTitle,
              type: 'string',
              validation: (Rule) => Rule.required().error('Step title is required'),
            }),
            defineField({
              name: f.itemTextName,
              title: f.itemTextTitle,
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required().error('Step description is required'),
            }),
          ],
          preview: {
            select: {
              title: f.itemTitleName,
              subtitle: f.itemNumberName,
            },
            prepare({ title, subtitle }) {
              return {
                title: `${subtitle || '01'}. ${title || 'Step'}`,
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
    ...(f.rows ? { rows: f.rows } : {}),
    group: config.group.name,
    initialValue: f.initialValue,
  });
});
