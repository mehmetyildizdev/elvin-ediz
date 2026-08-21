import { defaultPosts } from '@/data/defaults/posts';
import { upsertDocument } from '../../lib/sanity-helpers';
import type { Task, TaskContext } from '../../types';

export const seedPostsTask: Task = {
  id: 'posts',
  name: 'Seed Default Posts (All Kinds)',
  description: 'Seeds all 28 baseline insight articles, practical guides, announcements, and news into Sanity CMS.',
  run: async (ctx: TaskContext) => {
    for (const p of defaultPosts) {
      await upsertDocument(ctx, {
        _id: p._id,
        _type: 'post',
        language: 'en',
        title: p.title,
        slug: { _type: 'slug', current: p.slug },
        kind: p.kind,
        category: p.category,
        iconName: p.iconName,
        excerpt: p.excerpt,
        publishedAt: p.publishedAt,
        sourceURL: p.sourceURL,
        sourceName: p.sourceName,
        readTime: p.readTime,
        editorialNote: p.editorialNote,
        newsHighlights: p.newsHighlights,
        newsImpactTitle: p.newsImpactTitle,
        newsImpactText: p.newsImpactText,
        newsCtaButtonText: p.newsCtaButtonText,
        newsCtaButtonLink: p.newsCtaButtonLink,
        authorName: p.authorName,
        authorRole: p.authorRole,
        authorOversightIcon: p.authorOversightIcon,
        authorOversightTitle: p.authorOversightTitle,
        authorOversightSubtitle: p.authorOversightSubtitle,
        authorOversightText: p.authorOversightText,
        authorOversightCtaText: p.authorOversightCtaText,
        authorOversightCtaLink: p.authorOversightCtaLink,
        checklistIcon: p.checklistIcon,
        checklistTitle: p.checklistTitle,
        checklistDescription: p.checklistDescription,
        checklistItems: p.checklistItems,
        infoCtaTitle: p.infoCtaTitle,
        infoCtaSubtitle: p.infoCtaSubtitle,
        infoCtaButtonText: p.infoCtaButtonText,
        infoCtaButtonLink: p.infoCtaButtonLink,
        effectiveDate: p.effectiveDate,
        announcementNoticeIcon: p.announcementNoticeIcon,
        announcementNoticeEyebrow: p.announcementNoticeEyebrow,
        announcementNoticeTitle: p.announcementNoticeTitle,
        announcementActionTitle: p.announcementActionTitle,
        announcementActionText: p.announcementActionText,
        announcementCtaButtonText: p.announcementCtaButtonText,
        announcementCtaButtonLink: p.announcementCtaButtonLink,
        content: p.content,
      });
    }
  },
};
