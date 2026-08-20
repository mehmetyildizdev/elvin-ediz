import { defineType } from 'sanity';
import { EarthGlobeIcon } from '@sanity/icons/EarthGlobe';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { InfoOutlineIcon } from '@sanity/icons/InfoOutline';
import { BellIcon } from '@sanity/icons/Bell';
import { DocumentsIcon } from '@sanity/icons/Documents';
import { EnvelopeIcon } from '@sanity/icons/Envelope';
import { SearchIcon } from '@sanity/icons/Search';

import config from './index.json';
import { headerGroup, headerFields } from './header';
import { insightsSectionGroup, insightsSectionFields } from './insights';
import { informationGroup, informationFields } from './information';
import { announcementsGroup, announcementsFields } from './announcements';
import { newsGroup, newsFields } from './news';
import { consultationGroup, consultationFields } from './consultation';
import { seoGroup, seoFields } from './seo';

export const insightsPage = defineType({
  name: config.name,
  title: config.title,
  type: 'document',
  groups: [
    { ...headerGroup, icon: EarthGlobeIcon },
    { ...insightsSectionGroup, icon: DocumentTextIcon },
    { ...informationGroup, icon: InfoOutlineIcon },
    { ...announcementsGroup, icon: BellIcon },
    { ...newsGroup, icon: DocumentsIcon },
    { ...consultationGroup, icon: EnvelopeIcon },
    { ...seoGroup, icon: SearchIcon },
  ],
  fields: [
    ...headerFields,
    ...insightsSectionFields,
    ...informationFields,
    ...announcementsFields,
    ...newsFields,
    ...consultationFields,
    ...seoFields,
  ],
});

export default insightsPage;
