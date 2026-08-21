import { defineField } from 'sanity';
import config from './author.json';

export const authorGroup = config.group;

export const authorFields = Object.values(config.fields).map((f: any) => {
  if (f.name === 'author') {
    return defineField({
      name: f.name,
      title: f.title,
      type: 'reference',
      to: [{ type: 'staffMember' }],
      group: config.group.name,
      description:
        'Select an authorized RCIC consultant or team member from Staff (defaults to Nazly Sunguroglu, RCIC)',
      options: {
        filter: ({ document }: { document?: any }) => {
          const lang = document?.language || 'en';
          return {
            filter: 'language == $lang || (!defined(language) && $lang == "en")',
            params: { lang },
          };
        },
      },
      initialValue: async (params: any, context: any) => {
        try {
          const client = context.getClient({ apiVersion: '2024-01-01' });
          const docLang = params?.language || (context as any)?.document?.language || 'en';

          // 01. Attempt to find Nazly in the matching document language
          if (docLang && docLang !== 'en') {
            const localizedStaff = await client.fetch(
              `*[_type == "staffMember" && (name match "*Nazly*" || _id match "*nazly*") && language == $docLang][0]{ _id }`,
              { docLang }
            );
            if (localizedStaff?._id) {
              return {
                _type: 'reference',
                _ref: localizedStaff._id,
              };
            }
          }

          // 02. Fallback to primary/English Nazly
          const staff = await client.fetch(
            `*[_type == "staffMember" && (name match "*Nazly*" || _id == "staff-nazly")][0]{ _id }`
          );
          if (staff?._id) {
            return {
              _type: 'reference',
              _ref: staff._id,
            };
          }
        } catch {
          // fallback
        }
        return {
          _type: 'reference',
          _ref: 'staff-nazly',
        };
      },
    });
  }

  return defineField({
    name: f.name,
    title: f.title,
    type: f.type,
    group: config.group.name,
    description: f.description,
  });
});
