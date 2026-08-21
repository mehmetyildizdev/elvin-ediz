import { defineType } from 'sanity';
import { InfoOutlineIcon } from '@sanity/icons/InfoOutline';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { SparklesIcon } from '@sanity/icons/Sparkles';
import { SearchIcon } from '@sanity/icons/Search';

import config from './index.json';
import { generalGroup, generalFields } from './general';
import { bodyGroup, bodyFields } from './body';
import { ctaGroup, ctaFields } from './cta';
import { seoGroup, seoFields } from './seo';
import { languageField } from '../../i18n/schema';

export const service = defineType({
  name: config.name,
  title: config.title,
  type: 'document',
  groups: [
    { ...generalGroup, icon: InfoOutlineIcon },
    { ...bodyGroup, icon: DocumentTextIcon },
    { ...ctaGroup, icon: SparklesIcon },
    { ...seoGroup, icon: SearchIcon },
  ],
  fields: [languageField, ...generalFields, ...bodyFields, ...ctaFields, ...seoFields],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
      media: 'coverImage',
      language: 'language',
    },
    prepare({ title, subtitle, media, language }) {
      const langBadge = language ? `[${language.toUpperCase()}] ` : '';
      return {
        title: `${langBadge}${title || 'Untitled Service'}`,
        subtitle: subtitle || 'Immigration Service',
        media,
      };
    },
  },
});

export default service;
