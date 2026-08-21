import { logger } from '../../lib/logger';
import type { Task, TaskContext } from '../../types';

const defaultContactFormEn = {
  contactNameLabel: 'Your name',
  contactNamePlaceholder: 'How should we call you?',
  contactEmailLabel: 'Email address',
  contactEmailPlaceholder: 'you@example.com',
  contactPhoneLabel: 'Phone number',
  contactPhonePlaceholder: 'Your preferred number',
  contactOptionalText: '(optional)',
  contactServiceLabel: 'What can we help with?',
  contactServicePlaceholder: 'Select a service',
  contactMessageLabel: 'Tell us a little more',
  contactMessagePlaceholder: 'What would you like help with?',
  contactSubmitButtonText: 'Free Consultation Request',
  contactSubmittingText: 'Sending…',
  contactSuccessMessage: "Thank you — we'll be in touch soon.",
  contactErrorMessage: 'Something went wrong. Please email us directly.',
  contactDisclaimer: 'By submitting, you agree to be contacted by Elvin Ediz Immigration Services.',
};

export const seedContactTask: Task = {
  id: 'contact',
  name: 'Seed Contact Form Labels',
  description: 'Seeds contact form labels and placeholders on homePage documents in Sanity CMS.',
  run: async (ctx: TaskContext) => {
    if (ctx.dryRun) {
      logger.dryRun('Updating contact form labels on homePage documents');
      return;
    }

    const existingDocs = await ctx.client.fetch<Array<{ _id: string; language?: string }>>(
      '*[_type == "homePage"]{ _id, language }'
    );

    if (existingDocs.length === 0) {
      logger.warn('No homePage document found to attach contact form labels.');
      return;
    }

    for (const doc of existingDocs) {
      await ctx.client.patch(doc._id).setIfMissing(defaultContactFormEn).commit();
      logger.success(`Updated contact form fields on document ${doc._id}`);
    }
  },
};
