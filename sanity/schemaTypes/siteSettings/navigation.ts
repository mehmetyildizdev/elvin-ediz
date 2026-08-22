import { defineArrayMember, defineField } from 'sanity';
import config from './navigation.json';

export const navigationGroup = config.group;

export const navigationFields = [
  defineField({
    name: config.fields.headerNav.name,
    title: config.fields.headerNav.title,
    type: 'array',
    group: config.group.name,
    of: [
      defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Menu Label', type: 'string' }),
          defineField({ name: 'href', title: 'Link URL', type: 'string' }),
        ],
        preview: {
          select: {
            title: 'label',
            subtitle: 'href',
          },
        },
      }),
    ],
    initialValue: config.fields.headerNav.initialValue,
  }),
  defineField({
    name: config.fields.footerDescription.name,
    title: config.fields.footerDescription.title,
    type: 'text',
    group: config.group.name,
    rows: config.fields.footerDescription.rows,
    initialValue: config.fields.footerDescription.initialValue,
  }),
  defineField({
    name: config.fields.footerNavTitle.name,
    title: config.fields.footerNavTitle.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.footerNavTitle.initialValue,
  }),
  defineField({
    name: config.fields.footerNav.name,
    title: config.fields.footerNav.title,
    type: 'array',
    group: config.group.name,
    of: [
      defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Link Label', type: 'string' }),
          defineField({ name: 'href', title: 'Link URL', type: 'string' }),
        ],
        preview: {
          select: {
            title: 'label',
            subtitle: 'href',
          },
        },
      }),
    ],
    initialValue: config.fields.footerNav.initialValue,
  }),
  defineField({
    name: config.fields.footerConnectTitle.name,
    title: config.fields.footerConnectTitle.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.footerConnectTitle.initialValue,
  }),
  defineField({
    name: config.fields.footerConsultationText.name,
    title: config.fields.footerConsultationText.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.footerConsultationText.initialValue,
  }),
  defineField({
    name: config.fields.footerPrivacyText.name,
    title: config.fields.footerPrivacyText.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.footerPrivacyText.initialValue,
  }),
  defineField({
    name: config.fields.footerNotice.name,
    title: config.fields.footerNotice.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.footerNotice.initialValue,
  }),
  defineField({
    name: config.fields.copyrightText.name,
    title: config.fields.copyrightText.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.copyrightText.initialValue,
  }),
  defineField({
    name: config.fields.showDeveloperCredit.name,
    title: config.fields.showDeveloperCredit.title,
    description: config.fields.showDeveloperCredit.description,
    type: 'boolean',
    group: config.group.name,
    initialValue: true,
  }),
  defineField({
    name: config.fields.developerCreditText.name,
    title: config.fields.developerCreditText.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.developerCreditText.initialValue,
    hidden: ({ parent }) => parent?.showDeveloperCredit === false,
  }),
  defineField({
    name: config.fields.developerCreditName.name,
    title: config.fields.developerCreditName.title,
    type: 'string',
    group: config.group.name,
    initialValue: config.fields.developerCreditName.initialValue,
    hidden: ({ parent }) => parent?.showDeveloperCredit === false,
  }),
  defineField({
    name: config.fields.developerCreditUrl.name,
    title: config.fields.developerCreditUrl.title,
    type: 'url',
    group: config.group.name,
    initialValue: config.fields.developerCreditUrl.initialValue,
    hidden: ({ parent }) => parent?.showDeveloperCredit === false,
  }),
];
