import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Website Title',
      type: 'string',
      initialValue: 'Elvin Ediz Immigration Services',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'info@elvinediz.com',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '(647) 568 1009',
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'string',
      initialValue: 'Mon - Fri: 09:00am - 4:00pm',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'text',
      rows: 2,
      initialValue: 'Toronto, Ontario, Canada',
    }),
    defineField({
      name: 'consultationLink',
      title: 'Booking / Consultation Link',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      description: 'Enter WhatsApp phone number (e.g. 123456789). The website will automatically format WhatsApp chat links using this number.',
      type: 'string',
      initialValue: '123456789',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      initialValue: 'https://www.linkedin.com/in/nazly-sunguroglu-31574455/',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      initialValue: 'https://www.instagram.com/elvinedizimmigration/',
    }),

    // Navigation Menu
    defineField({
      name: 'headerNav',
      title: 'Header Navigation Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Menu Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link URL', type: 'string' }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'footerNotice',
      title: 'Footer Accreditation Notice',
      type: 'string',
      initialValue: 'Regulated Canadian Immigration Consultant (RCIC)',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Notice',
      type: 'string',
      initialValue: '© Elvin Ediz Immigration Services. All rights reserved.',
    }),
  ],
});
