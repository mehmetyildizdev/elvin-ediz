import React from 'react';
import { defineField, defineType } from 'sanity';

const StatusBadge = ({ status }: { status?: string }) => {
  const isNew = status === 'New' || !status;
  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: isNew ? '#dcfce7' : '#f1f5f9',
        border: `2px solid ${isNew ? '#22c55e' : '#cbd5e1'}`,
      },
    },
    React.createElement('span', {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: isNew ? '#16a34a' : '#94a3b8',
        boxShadow: isNew ? '0 0 6px #22c55e' : 'none',
      },
    })
  );
};

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
        list: [
          { title: '🟢 New (Needs Attention)', value: 'New' },
          { title: '⚪ Contacted (Handled)', value: 'Contacted' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'receivedAt',
      title: 'Received at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'service',
      status: 'status',
      date: 'receivedAt',
    },
    prepare({ title, subtitle, status, date }) {
      const isNew = status === 'New' || !status;
      const formattedDate = date ? new Date(date).toLocaleDateString() : '';
      return {
        title: `${isNew ? '🟢' : '⚪'} ${title || 'Unnamed Submission'}`,
        subtitle: `${isNew ? 'NEW' : 'CONTACTED'} • ${subtitle || 'General Inquiry'} • ${formattedDate}`,
        media: () => React.createElement(StatusBadge, { status }),
      };
    },
  },
});
