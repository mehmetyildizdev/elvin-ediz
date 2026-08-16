import { defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { UserIcon } from '@sanity/icons/User';
import { SparklesIcon } from '@sanity/icons/Sparkles';
import { InfoOutlineIcon } from '@sanity/icons/InfoOutline';
import { BellIcon } from '@sanity/icons/Bell';
import { DocumentsIcon } from '@sanity/icons/Documents';

import config from './index.json';
import { mainGroup, mainFields } from './main';
import { authorGroup, authorFields } from './author';
import { insightSectionGroup, insightSectionFields } from './insight';
import { informationSectionGroup, informationSectionFields } from './information';
import { announcementSectionGroup, announcementSectionFields } from './announcement';
import { newsSectionGroup, newsSectionFields } from './news';

export const post = defineType({
  name: config.name,
  title: config.title,
  type: 'document',
  groups: [
    { ...mainGroup, icon: DocumentTextIcon },
    { ...authorGroup, icon: UserIcon },
    { ...insightSectionGroup, icon: SparklesIcon },
    { ...informationSectionGroup, icon: InfoOutlineIcon },
    { ...announcementSectionGroup, icon: BellIcon },
    { ...newsSectionGroup, icon: DocumentsIcon },
  ],
  fields: [
    ...mainFields,
    ...authorFields,
    ...insightSectionFields,
    ...informationSectionFields,
    ...announcementSectionFields,
    ...newsSectionFields,
  ],
  preview: {
    select: { title: 'title', subtitle: 'kind', media: 'coverImage' },
  },
});

export default post;
