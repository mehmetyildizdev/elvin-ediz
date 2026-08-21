import { defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons/Home';
import { TagIcon } from '@sanity/icons/Tag';
import { CaseIcon } from '@sanity/icons/Case';
import { UserIcon } from '@sanity/icons/User';
import { SparklesIcon } from '@sanity/icons/Sparkles';
import { StarIcon } from '@sanity/icons/Star';
import { ClockIcon } from '@sanity/icons/Clock';
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
import { processGroup, processFields } from './process';
import { insightsGroup, insightsFields } from './insights';
import { contactGroup, contactFields } from './contact';
import { seoGroup, seoFields } from './seo';
import { languageField } from '../../i18n';

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
    { ...processGroup, icon: ClockIcon },
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
    ...processFields,
    ...insightsFields,
    ...contactFields,
    ...seoFields,
  ],
});

export default homePage;
