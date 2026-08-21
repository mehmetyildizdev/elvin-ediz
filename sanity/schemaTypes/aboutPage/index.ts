import { defineType } from 'sanity';
import { UserIcon } from '@sanity/icons/User';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { SparklesIcon } from '@sanity/icons/Sparkles';
import { CheckmarkCircleIcon } from '@sanity/icons/CheckmarkCircle';
import { EnvelopeIcon } from '@sanity/icons/Envelope';
import { SearchIcon } from '@sanity/icons/Search';

import config from './index.json';
import { headerGroup, headerFields } from './header';
import { whoAreWeGroup, whoAreWeFields } from './whoAreWe';
import { strategyGroup, strategyFields } from './strategy';
import { processGroup, processFields } from './process';
import { ctaGroup, ctaFields } from './cta';
import { seoGroup, seoFields } from './seo';
import { languageField } from '../../i18n/schema';

export const aboutPage = defineType({
  name: config.name,
  title: config.title,
  type: 'document',
  groups: [
    { ...headerGroup, icon: DocumentTextIcon },
    { ...whoAreWeGroup, icon: SparklesIcon },
    { ...strategyGroup, icon: UserIcon },
    { ...processGroup, icon: CheckmarkCircleIcon },
    { ...ctaGroup, icon: EnvelopeIcon },
    { ...seoGroup, icon: SearchIcon },
  ],
  fields: [
    languageField,
    ...headerFields,
    ...whoAreWeFields,
    ...strategyFields,
    ...processFields,
    ...ctaFields,
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
        title: `[${l}] About Us Page`,
        subtitle: title ? `${subtitle ? `${subtitle} - ` : ''}${title}` : 'Company & Leadership',
      };
    },
  },
});

export default aboutPage;
