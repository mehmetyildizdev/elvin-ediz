import { defineArrayMember, defineField, defineType } from 'sanity';
import { HelpCircleIcon } from '@sanity/icons/HelpCircle';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { EnvelopeIcon } from '@sanity/icons/Envelope';
import { CodeIcon } from '@sanity/icons/Code';
import { SearchIcon } from '@sanity/icons/Search';
import { languageField } from '../i18n';

export const faqPage = defineType({
  name: 'faqPage',
  title: 'Q&A',
  type: 'document',
  groups: [
    { name: 'header', title: '01. Page Header', icon: DocumentTextIcon, default: true },
    { name: 'faqs', title: '02. Questions & Answers', icon: HelpCircleIcon },
    { name: 'cta', title: '03. Consultation Callout', icon: EnvelopeIcon },
    { name: 'seo', title: '04. SEO & Social', icon: SearchIcon },
  ],
  fields: [
    languageField,
    // 01. Page Header
    defineField({
      name: 'eyebrow',
      title: 'Header Eyebrow',
      type: 'string',
      group: 'header',
      initialValue: 'COMMON QUESTIONS',
    }),
    defineField({
      name: 'titleMain',
      title: 'Header Title Main',
      type: 'string',
      group: 'header',
      initialValue: 'Clear answers for',
    }),
    defineField({
      name: 'titleAccent',
      title: 'Header Title Accent',
      type: 'string',
      group: 'header',
      initialValue: 'the road ahead.',
    }),
    defineField({
      name: 'description',
      title: 'Header Description',
      type: 'text',
      rows: 3,
      group: 'header',
      initialValue:
        'Every immigration path is different. These answers offer a helpful place to begin.',
    }),

    // 02. Questions & Answers (Portable Text)
    defineField({
      name: 'items',
      title: 'Questions and Answers',
      type: 'array',
      group: 'faqs',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          title: 'Question & Answer',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'category',
              title: 'Category / Topic Tag',
              description:
                'Optional topic tag (e.g. Express Entry, Study Permits, General, Sponsorship)',
              type: 'string',
            }),
            defineField({
              name: 'answer',
              title: 'Answer (Rich Content / Portable Text)',
              description: 'Format your answer with bolding, lists, links, or paragraphs.',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H4', value: 'h4' },
                    { title: 'H5', value: 'h5' },
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
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'category',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Untitled Question',
                subtitle: subtitle ? `[${subtitle}]` : 'Q&A Item',
              };
            },
          },
        }),
      ],
    }),

    // 03. Consultation Callout
    defineField({
      name: 'ctaEyebrow',
      title: 'Callout Eyebrow',
      type: 'string',
      group: 'cta',
      initialValue: 'STILL HAVE QUESTIONS?',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Callout Title',
      type: 'string',
      group: 'cta',
      initialValue: 'Need personalized advice on your Canadian immigration case?',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Callout Description',
      type: 'text',
      rows: 2,
      group: 'cta',
      initialValue:
        'Schedule a 1-on-1 consultation with Nazly Sunguroglu, RCIC to evaluate your eligibility, documents, and options.',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Callout Button Text',
      type: 'string',
      group: 'cta',
      initialValue: 'Book Consultation',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'Callout Button Link (Optional)',
      description: 'Custom link URL or leave blank to open WhatsApp consultation.',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'seo',
      title: 'Q&A / FAQs Page SEO & Social Share',
      type: 'seo',
      group: 'seo',
      description: 'Search engine metadata and social preview for the FAQ / Q&A page (/questions).',
    }),
  ],
});
