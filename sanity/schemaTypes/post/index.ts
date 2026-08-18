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
  initialValue: async (_params, context) => {
    let authorRef = { _type: 'reference', _ref: 'staff-nazly' };
    try {
      const client = context.getClient({ apiVersion: '2024-01-01' });
      const staff = await client.fetch(
        `*[_type == "staffMember" && (name match "*Nazly*" || _id == "staff-nazly")][0]{ _id }`
      );
      if (staff?._id) {
        authorRef = { _type: 'reference', _ref: staff._id };
      }
    } catch {
      // fallback
    }
    return {
      author: authorRef,
    };
  },
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
