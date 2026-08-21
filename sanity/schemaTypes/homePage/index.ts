import { defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons/Home';
import { TagIcon } from '@sanity/icons/Tag';
import { CaseIcon } from '@sanity/icons/Case';
import { UserIcon } from '@sanity/icons/User';
import { SparklesIcon } from '@sanity/icons/Sparkles';
import { StarIcon } from '@sanity/icons/Star';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { EnvelopeIcon } from '@sanity/icons/Envelope';
import { SearchIcon } from '@sanity/icons/Search';

import config from './index.json';
import { heroGroup, heroFields } from './hero';
import { trustBarGroup, trustBarFields } from './trustBar';
import { servicesGroup, servicesFields } from './services';
import { whoAreWeGroup, whoAreWeFields } from './whoAreWe';
import { strategyGroup, strategyFields } from './strategy';
import { testimonialsGroup, testimonialsFields } from './testimonials';
import { insightsGroup, insightsFields } from './insights';
import { contactGroup, contactFields } from './contact';
import { seoGroup, seoFields } from './seo';
import { languageField } from '../../i18n/schema';

export const homePage = defineType({
  name: config.name,
  title: config.title,
  type: 'document',
  groups: [
    { ...heroGroup, icon: HomeIcon },
    { ...trustBarGroup, icon: TagIcon },
    { ...servicesGroup, icon: CaseIcon },
    { ...whoAreWeGroup, icon: UserIcon },
    { ...strategyGroup, icon: SparklesIcon },
    { ...testimonialsGroup, icon: StarIcon },
    { ...insightsGroup, icon: DocumentTextIcon },
    { ...contactGroup, icon: EnvelopeIcon },
    { ...seoGroup, icon: SearchIcon },
  ],
  fields: [
    languageField,
    ...heroFields,
    ...trustBarFields,
    ...servicesFields,
    ...whoAreWeFields,
    ...strategyFields,
    ...testimonialsFields,
    ...insightsFields,
    ...contactFields,
    ...seoFields,
  ],
  preview: {
    select: {
      lang: 'language',
      title: 'heroTitle',
    },
    prepare({ lang, title }) {
      const l = (lang || 'en').toUpperCase();
      return {
        title: `[${l}] Home Page`,
        subtitle: title || 'Main landing page',
      };
    },
  },
});

export default homePage;
