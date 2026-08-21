import { defineType } from 'sanity';
import { HelpCircleIcon } from '@sanity/icons/HelpCircle';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { EnvelopeIcon } from '@sanity/icons/Envelope';
import { SearchIcon } from '@sanity/icons/Search';

import config from './index.json';
import { headerGroup, headerFields } from './header';
import { faqsGroup, faqsFields } from './faqs';
import { ctaGroup, ctaFields } from './cta';
import { seoGroup, seoFields } from './seo';
import { languageField } from '../../i18n/schema';

export const faqPage = defineType({
  name: config.name,
  title: config.title,
  type: 'document',
  groups: [
    { ...headerGroup, icon: DocumentTextIcon },
    { ...faqsGroup, icon: HelpCircleIcon },
    { ...ctaGroup, icon: EnvelopeIcon },
    { ...seoGroup, icon: SearchIcon },
  ],
  fields: [
    languageField,
    ...headerFields,
    ...faqsFields,
    ...ctaFields,
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
        title: `[${l}] Questions & Answers (FAQ) Page`,
        subtitle: title || 'Frequently asked questions',
      };
    },
  },
});

export default faqPage;
