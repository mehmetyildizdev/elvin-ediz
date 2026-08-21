import { defineArrayMember, defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';
import { EnvelopeIcon } from '@sanity/icons/Envelope';
import { EarthGlobeIcon } from '@sanity/icons/EarthGlobe';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { SearchIcon } from '@sanity/icons/Search';
import { languageField } from '../i18n/schema';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Navigation',
  type: 'document',
  groups: [
    { name: 'general', title: '01. General & Brand', icon: CogIcon, default: true },
    { name: 'contact', title: '02. Contact & Office', icon: EnvelopeIcon },
    { name: 'social', title: '03. Social & WhatsApp', icon: EarthGlobeIcon },
    { name: 'navigation', title: '04. Navigation & Footer', icon: DocumentTextIcon },
    { name: 'seo', title: '05. Global SEO & Metadata', icon: SearchIcon },
  ],
  fields: [
    languageField,
    defineField({
      name: 'siteTitle',
      title: 'Website Brand Title',
      type: 'string',
      group: 'general',
      initialValue: 'Elvin Ediz Immigration Services',
    }),
    defineField({
      name: 'consultationLink',
      title: 'Booking / Consultation Link',
      type: 'string',
      group: 'general',
      initialValue: '/contact',
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'string',
      group: 'general',
      initialValue: 'Mon - Fri: 09:00am - 4:00pm',
    }),

    // Contact & Office
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      group: 'contact',
      initialValue: 'info@elvinediz.com',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
      initialValue: '(647) 568 1009',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'text',
      group: 'contact',
      rows: 2,
      initialValue: 'Toronto, Ontario, Canada',
    }),

    // Social & Messaging
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      description:
        'Enter WhatsApp phone number (e.g. 123456789). The website will automatically format WhatsApp chat links using this number.',
      type: 'string',
      group: 'social',
      initialValue: '123456789',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'social',
      initialValue: 'https://www.linkedin.com/in/nazly-sunguroglu-31574455/',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
      initialValue: 'https://www.instagram.com/elvinedizimmigration/',
    }),

    // Navigation Menu & Footer
    defineField({
      name: 'headerNav',
      title: 'Header Navigation Links',
      type: 'array',
      group: 'navigation',
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
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Brand Tagline / Description',
      type: 'text',
      group: 'navigation',
      rows: 2,
      initialValue:
        'Guidance for your next chapter in Canada. Personal, regulated Canadian immigration consulting.',
    }),
    defineField({
      name: 'footerNavTitle',
      title: 'Footer Navigation Column Title',
      type: 'string',
      group: 'navigation',
      initialValue: 'Explore',
    }),
    defineField({
      name: 'footerNav',
      title: 'Footer Navigation Links',
      type: 'array',
      group: 'navigation',
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
      initialValue: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Insights', href: '/insights' },
        { label: 'Q&A', href: '/questions' },
        { label: 'Privacy Policy', href: '/privacy' },
      ],
    }),
    defineField({
      name: 'footerConnectTitle',
      title: 'Footer Connect Column Title',
      type: 'string',
      group: 'navigation',
      initialValue: 'Connect',
    }),
    defineField({
      name: 'footerConsultationText',
      title: 'Footer Consultation Link Text',
      type: 'string',
      group: 'navigation',
      initialValue: 'Free Consultation',
    }),
    defineField({
      name: 'footerPrivacyText',
      title: 'Footer Privacy Policy Link Text',
      type: 'string',
      group: 'navigation',
      initialValue: 'Privacy Policy',
    }),
    defineField({
      name: 'footerNotice',
      title: 'Footer Accreditation Notice',
      type: 'string',
      group: 'navigation',
      initialValue: 'Regulated Canadian Immigration Consultant (RCIC)',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Notice',
      type: 'string',
      group: 'navigation',
      initialValue: '© Elvin Ediz Immigration Services. All rights reserved.',
    }),

    // 05. Global SEO & Fallbacks
    defineField({
      name: 'defaultMetaTitle',
      title: 'Default Search Title',
      type: 'string',
      group: 'seo',
      initialValue: 'Elvin Ediz Immigration Services | Your Canadian Story Starts Here',
      description: 'Default title used across pages when no specific page meta title is provided.',
    }),
    defineField({
      name: 'titleTemplate',
      title: 'Page Title Template',
      type: 'string',
      group: 'seo',
      initialValue: '%s | Elvin Ediz Immigration Services',
      description:
        'Template pattern used for inner pages (e.g. "%s | Elvin Ediz Immigration Services").',
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default Search Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      initialValue:
        'Personalized Canadian immigration guidance and representation from Nazly Sunguroglu, RCIC. Express Entry, Study Permits, Work Permits, PNP, and Family Sponsorship in Toronto.',
      description: 'Fallback search description used when a page does not define its own.',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Social Share Banner (Open Graph)',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
      description:
        'Default 1200 x 630 px social share banner for WhatsApp, LinkedIn, and social link previews.',
    }),
    defineField({
      name: 'siteKeywords',
      title: 'Global Site Keywords',
      type: 'array',
      group: 'seo',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      initialValue: [
        'Canadian Immigration',
        'RCIC Toronto',
        'Nazly Sunguroglu',
        'Express Entry Canada',
        'Study in Canada',
        'PGWP Work Permit',
        'LMIA Canada',
        'Spousal Sponsorship',
        'Provincial Nominee Program',
      ],
      description: 'Global site-wide SEO keywords and topics.',
    }),
    defineField({
      name: 'googleSiteVerification',
      title: 'Google Search Console Verification Token',
      type: 'string',
      group: 'seo',
      description:
        'Optional verification meta tag content for Google Search Console (e.g. "google-site-verification=abc...").',
    }),
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

