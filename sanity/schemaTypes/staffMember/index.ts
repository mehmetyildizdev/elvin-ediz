import { defineType } from 'sanity';
import config from './index.json';
import { staffMemberFields } from './fields';
import { languageField } from '../../i18n/schema';

export const staffMember = defineType({
  name: config.name,
  title: config.title,
  type: 'document',
  fields: [languageField, ...staffMemberFields],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo', language: 'language' },
    prepare({ title, subtitle, media, language }) {
      const langBadge = language ? `[${language.toUpperCase()}] ` : '';
      return {
        title: `${langBadge}${title || 'Team Member'}`,
        subtitle,
        media,
      };
    },
  },
});

export default staffMember;
