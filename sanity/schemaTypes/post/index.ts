import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { UserIcon } from '@sanity/icons/User';
import { SparklesIcon } from '@sanity/icons/Sparkles';
import { SearchIcon } from '@sanity/icons/Search';

import config from './index.json';
import { mainGroup, mainFields } from './main';
import { authorGroup, authorFields } from './author';
import { insightSectionFields } from './insight';
import { informationSectionFields } from './information';
import { announcementSectionFields } from './announcement';
import { newsSectionFields } from './news';

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
    { name: 'typeConfig', title: '02. Type Settings', icon: SparklesIcon },
    { ...authorGroup, icon: UserIcon },
    { name: 'seo', title: '04. SEO & Social', icon: SearchIcon },
  ],
  fields: [
    ...mainFields,
    ...authorFields,
    ...insightSectionFields,
    ...informationSectionFields,
    ...announcementSectionFields,
    ...newsSectionFields,
    defineField({
      name: 'seo',
      title: 'SEO & Social Media Settings',
      type: 'seo',
      group: 'seo',
      description: 'Custom metadata, search engine snippets, and social share previews for this post.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'kind', media: 'coverImage' },
  },
});

export default post;
