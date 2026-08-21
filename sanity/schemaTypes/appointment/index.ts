import React from 'react';
import { defineType } from 'sanity';
import config from './index.json';
import { appointmentFields } from './fields';

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
  name: config.name,
  title: config.title,
  type: 'document',
  fields: appointmentFields,
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

export default appointment;
