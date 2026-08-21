import { defineType } from 'sanity';
import { EarthGlobeIcon } from '@sanity/icons/EarthGlobe';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { FilterIcon } from '@sanity/icons/Filter';
import { InfoOutlineIcon } from '@sanity/icons/InfoOutline';
import { BellIcon } from '@sanity/icons/Bell';
import { DocumentsIcon } from '@sanity/icons/Documents';
import { EnvelopeIcon } from '@sanity/icons/Envelope';
import { SearchIcon } from '@sanity/icons/Search';

import config from './index.json';
import { headerGroup, headerFields } from './header';
import { categoryNavGroup, categoryNavFields } from './categoryNav';
import { insightsSectionGroup, insightsSectionFields } from './insights';
import { informationGroup, informationFields } from './information';
import { announcementsGroup, announcementsFields } from './announcements';
import { newsGroup, newsFields } from './news';
import { consultationGroup, consultationFields } from './consultation';
import { seoGroup, seoFields } from './seo';
import { languageField } from '../../i18n/schema';

export const insightsPage = defineType({
  name: config.name,
  title: config.title,
  type: 'document',
  groups: [
    { ...headerGroup, icon: EarthGlobeIcon },
    { ...categoryNavGroup, icon: FilterIcon },
    { ...insightsSectionGroup, icon: DocumentTextIcon },
    { ...informationGroup, icon: InfoOutlineIcon },
    { ...announcementsGroup, icon: BellIcon },
    { ...newsGroup, icon: DocumentsIcon },
    { ...consultationGroup, icon: EnvelopeIcon },
    { ...seoGroup, icon: SearchIcon },
  ],
  fields: [
    languageField,
    ...headerFields,
    ...categoryNavFields,
    ...insightsSectionFields,
    ...informationFields,
    ...announcementsFields,
    ...newsFields,
    ...consultationFields,
    ...seoFields,
  ],
  preview: {
    select: {
      lang: 'language',
      title: 'titleMain',
    },
    prepare({ lang, title }) {
      const l = (lang || 'en').toUpperCase();
      return {
        title: `[${l}] Insights Hub Page`,
        subtitle: title || 'Insights & News hub settings',
      };
    },
  },
});

export default insightsPage;
