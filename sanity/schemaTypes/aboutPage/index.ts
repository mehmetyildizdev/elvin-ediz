import { defineType } from 'sanity';
import { UserIcon } from '@sanity/icons/User';
import { SearchIcon } from '@sanity/icons/Search';

import config from './index.json';
import { contentGroup, contentFields } from './content';
import { seoGroup, seoFields } from './seo';
import { languageField } from '../../i18n/schema';

export const aboutPage = defineType({
  name: config.name,
  title: config.title,
  type: 'document',
  groups: [
    { ...contentGroup, icon: UserIcon },
    { ...seoGroup, icon: SearchIcon },
  ],
  fields: [
    languageField,
    ...contentFields,
    ...seoFields,
  ],
});

export default aboutPage;
