import { defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { LockIcon } from '@sanity/icons/Lock';
import { EnvelopeIcon } from '@sanity/icons/Envelope';
import { SearchIcon } from '@sanity/icons/Search';

import config from './index.json';
import { headerGroup, headerFields } from './header';
import { commitmentGroup, commitmentFields } from './commitment';
import { bodyGroup, bodyFields } from './body';
import { inquiryGroup, inquiryFields } from './inquiry';
import { seoGroup, seoFields } from './seo';
import { languageField } from '../../i18n/schema';

export const privacyPage = defineType({
  name: config.name,
  title: config.title,
  type: 'document',
  groups: [
    { ...headerGroup, icon: DocumentTextIcon },
    { ...commitmentGroup, icon: LockIcon },
    { ...bodyGroup, icon: DocumentTextIcon },
    { ...inquiryGroup, icon: EnvelopeIcon },
    { ...seoGroup, icon: SearchIcon },
  ],
  fields: [
    languageField,
    ...headerFields,
    ...commitmentFields,
    ...bodyFields,
    ...inquiryFields,
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
        title: `[${l}] Privacy Policy Page`,
        subtitle: title || 'Client confidentiality policy',
      };
    },
  },
});

export default privacyPage;
