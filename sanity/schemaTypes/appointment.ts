import { defineField, defineType } from 'sanity';

export const appointment = defineType({
  name: 'appointment',
  title: 'Appointment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'service', title: 'Service', type: 'string' }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 4 }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'New',
      options: {
        list: ['New', 'Contacted', 'Booked', 'Completed', 'Declined'],
      },
    }),
    defineField({
      name: 'receivedAt',
      title: 'Received at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'email' } },
});
