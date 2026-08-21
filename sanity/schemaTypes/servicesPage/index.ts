import { defineType } from 'sanity';
import { CaseIcon } from '@sanity/icons/Case';
import { SearchIcon } from '@sanity/icons/Search';

import config from './index.json';
import { headerGroup, headerFields } from './header';
import { pathwaysGroup, pathwaysFields } from './pathways';
import { calloutGroup, calloutFields } from './callout';
import { seoGroup, seoFields } from './seo';
import { languageField } from '../../i18n/schema';

export const servicesPage = defineType({
  name: config.name,
  title: config.title,
  type: 'document',
  groups: [
    { ...headerGroup, icon: CaseIcon },
    { ...pathwaysGroup, icon: CaseIcon },
    { ...calloutGroup, icon: CaseIcon },
    { ...seoGroup, icon: SearchIcon },
  ],
  fields: [
    languageField,
    ...headerFields,
    ...pathwaysFields,
    ...calloutFields,
    ...seoFields,
  ],
  preview: {
    select: {
      lang: 'language',
      title: 'titleMain',
      subtitle: 'eyebrow',
    },
    prepare({ lang, title, subtitle }) {
      const l = (lang || 'en').toUpperCase();
      return {
        title: `[${l}] Services Page`,
        subtitle: title ? `${subtitle ? `${subtitle} - ` : ''}${title}` : 'Hero Header Settings',
      };
    },
  },
});

export default servicesPage;
