import { defineArrayMember, defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { LockIcon } from '@sanity/icons/Lock';
import { EnvelopeIcon } from '@sanity/icons/Envelope';
import { CodeIcon } from '@sanity/icons/Code';
import { SearchIcon } from '@sanity/icons/Search';
import { languageField } from '../i18n';

export const privacyPage = defineType({
  name: 'privacyPage',
  title: 'Privacy Policy',
  type: 'document',
  groups: [
    { name: 'header', title: '01. Page Header', icon: DocumentTextIcon, default: true },
    { name: 'commitment', title: '02. Commitment Box', icon: LockIcon },
    { name: 'body', title: '03. Policy Content', icon: DocumentTextIcon },
    { name: 'inquiry', title: '04. Contact & Inquiries', icon: EnvelopeIcon },
    { name: 'seo', title: '05. SEO & Social', icon: SearchIcon },
  ],
  fields: [
    languageField,
    // 01. Page Header
    defineField({
      name: 'eyebrow',
      title: 'Header Eyebrow',
      type: 'string',
      group: 'header',
      initialValue: 'LEGAL & CONFIDENTIALITY',
    }),
    defineField({
      name: 'titleMain',
      title: 'Header Title Main',
      type: 'string',
      group: 'header',
      initialValue: 'Privacy',
    }),
    defineField({
      name: 'titleAccent',
      title: 'Header Title Accent',
      type: 'string',
      group: 'header',
      initialValue: 'Policy',
    }),
    defineField({
      name: 'description',
      title: 'Header Description',
      type: 'text',
      rows: 2,
      group: 'header',
      initialValue:
        'How Elvin Ediz Immigration Services protects, handles, and safeguards your personal information.',
    }),

    // 02. Commitment Box
    defineField({
      name: 'commitmentTitle',
      title: 'Commitment Box Title',
      type: 'string',
      group: 'commitment',
      initialValue: 'Commitment to Client Confidentiality',
    }),
    defineField({
      name: 'commitmentText',
      title: 'Commitment Box Text',
      type: 'text',
      rows: 4,
      group: 'commitment',
      initialValue:
        'At Elvin Ediz Immigration Services, led by Nazly Sunguroglu, RCIC (Regulated Canadian Immigration Consultant), protecting your privacy and upholding the highest professional standards of the College of Immigration and Citizenship Consultants (CICC) is fundamental to our practice.',
    }),

    // 03. Policy Content (Portable Text)
    defineField({
      name: 'content',
      title: 'Policy Body Content (Rich Text / Portable Text)',
      type: 'array',
      group: 'body',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Image description' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'markdownBlock',
          title: 'Markdown',
          icon: CodeIcon,
          fields: [
            defineField({
              name: 'content',
              type: 'markdown',
              title: 'Markdown Content',
            }),
          ],
          preview: {
            select: {
              content: 'content',
            },
            prepare({ content }) {
              return {
                title: 'Markdown Block',
                subtitle: content ? content.slice(0, 60) : 'Empty markdown content',
                media: CodeIcon,
              };
            },
          },
        }),
      ],
    }),

    // 04. Contact & Inquiries Box
    defineField({
      name: 'inquiryTitle',
      title: 'Inquiry Section Heading',
      type: 'string',
      group: 'inquiry',
      initialValue: '5. Privacy Inquiries & Contact',
    }),
    defineField({
      name: 'inquiryDescription',
      title: 'Inquiry Section Description',
      type: 'text',
      rows: 2,
      group: 'inquiry',
      initialValue:
        'If you have questions regarding this Privacy Policy or wish to review, update, or request the deletion of your personal information, please reach out to us:',
    }),
    defineField({
      name: 'companyName',
      title: 'Company / Advisory Name',
      type: 'string',
      group: 'inquiry',
      initialValue: 'Elvin Ediz Immigration Advisory',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      group: 'inquiry',
      initialValue: 'info@elvinediz.com',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
      group: 'inquiry',
      initialValue: '+1 (437) 772-2349',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'string',
      group: 'inquiry',
      initialValue: 'Toronto, Ontario, Canada',
    }),
    defineField({
      name: 'seo',
      title: 'Privacy Policy SEO & Social Share',
      type: 'seo',
      group: 'seo',
      description:
        'Search engine metadata and social preview for the Privacy Policy page (/privacy-policy).',
    }),
  ],
});
