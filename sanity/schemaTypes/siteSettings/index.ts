import { defineType } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';
import { EnvelopeIcon } from '@sanity/icons/Envelope';
import { EarthGlobeIcon } from '@sanity/icons/EarthGlobe';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { SearchIcon } from '@sanity/icons/Search';

import config from './index.json';
import { generalGroup, generalFields } from './general';
import { contactGroup, contactFields } from './contact';
import { socialGroup, socialFields } from './social';
import { navigationGroup, navigationFields } from './navigation';
import { seoGroup, seoFields } from './seo';
import { languageField } from '../../i18n/schema';

export const siteSettings = defineType({
  name: config.name,
  title: config.title,
  type: 'document',
  groups: [
    { ...generalGroup, icon: CogIcon },
    { ...contactGroup, icon: EnvelopeIcon },
    { ...socialGroup, icon: EarthGlobeIcon },
    { ...navigationGroup, icon: DocumentTextIcon },
    { ...seoGroup, icon: SearchIcon },
  ],
  fields: [
    languageField,
    ...generalFields,
    ...contactFields,
    ...socialFields,
    ...navigationFields,
    ...seoFields,
  ],
  preview: {
    select: {
      lang: 'language',
      siteTitle: 'siteTitle',
    },
    prepare({ lang, siteTitle }) {
      const l = (lang || 'en').toUpperCase();
      return {
        title: `[${l}] Site Settings & Navigation`,
        subtitle: siteTitle || 'Global settings, header, footer',
      };
    },
  },
});

export default siteSettings;
