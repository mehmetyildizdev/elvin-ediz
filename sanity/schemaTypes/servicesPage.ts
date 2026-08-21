import { defineField, defineType } from 'sanity';
import { CaseIcon } from '@sanity/icons/Case';
import { SearchIcon } from '@sanity/icons/Search';
import { languageField } from '../i18n/schema';

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  groups: [
    { name: 'header', title: '01. Page Header', icon: CaseIcon, default: true },
    { name: 'pathways', title: '02. Pathways Layout & Labels', icon: CaseIcon },
    { name: 'callout', title: '03. Consultation Callout', icon: CaseIcon },
    { name: 'seo', title: '04. SEO & Social', icon: SearchIcon },
  ],
  fields: [
    languageField,
    // 01. Page Header
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      group: 'header',
      initialValue: 'HOW WE CAN HELP',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleMain',
      title: 'Main Heading (Part 1)',
      type: 'string',
      group: 'header',
      initialValue: 'A pathway built',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleAccent',
      title: 'Accent Heading (Italicized)',
      type: 'string',
      group: 'header',
      initialValue: 'around you.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Hero Description / Copy',
      type: 'text',
      group: 'header',
      rows: 3,
      initialValue:
        'Personalized Canadian immigration guidance for the next chapter you are ready to build.',
      validation: (rule) => rule.required(),
    }),

    // 02. Pathways Layout & Section Labels
    defineField({
      name: 'pathwayNavTitle',
      title: 'Pathway Navigation Bar Title',
      type: 'string',
      group: 'pathways',
      initialValue: 'Select Pathway',
    }),
    defineField({
      name: 'pathwayNumberPrefix',
      title: 'Pathway Number Prefix (e.g. PATHWAY 01)',
      type: 'string',
      group: 'pathways',
      initialValue: 'PATHWAY',
    }),
    defineField({
      name: 'rcicAssessedBadgeText',
      title: 'RCIC Assessed Badge Text',
      type: 'string',
      group: 'pathways',
      initialValue: 'RCIC Assessed',
    }),
    defineField({
      name: 'pathwaySummaryTitle',
      title: 'Pathway Summary Section Heading',
      type: 'string',
      group: 'pathways',
      initialValue: 'Pathway Summary',
    }),
    defineField({
      name: 'featuresSectionTitle',
      title: 'Key Requirements & Inclusions Section Heading',
      type: 'string',
      group: 'pathways',
      initialValue: 'Key Requirements & Inclusions',
    }),
    defineField({
      name: 'detailedOverviewTitle',
      title: 'Detailed Pathway Overview Section Heading',
      type: 'string',
      group: 'pathways',
      initialValue: 'Detailed Pathway Overview',
    }),

    // 03. Bottom Consultation Callout
    defineField({
      name: 'calloutEyebrow',
      title: 'Callout Eyebrow',
      type: 'string',
      group: 'callout',
      initialValue: 'NOT SURE WHERE TO BEGIN?',
    }),
    defineField({
      name: 'calloutTitleMain',
      title: 'Callout Title Main',
      type: 'string',
      group: 'callout',
      initialValue: 'We can find the',
    }),
    defineField({
      name: 'calloutTitleAccent',
      title: 'Callout Title Accent',
      type: 'string',
      group: 'callout',
      initialValue: 'right starting point.',
    }),
    defineField({
      name: 'calloutButtonText',
      title: 'Callout Button Label',
      type: 'string',
      group: 'callout',
      initialValue: 'Free Consultation',
    }),

    // 04. SEO
    defineField({
      name: 'seo',
      title: 'Services Page SEO & Social Share',
      type: 'seo',
      group: 'seo',
      description:
        'Search engine metadata and social preview for the main Services directory page (/services).',
    }),
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
        title: `[${l}] Services Page`,
        subtitle: title ? `${subtitle ? `${subtitle} - ` : ''}${title}` : 'Hero Header Settings',
      };
    },
  },
});

