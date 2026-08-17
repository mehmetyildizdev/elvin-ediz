import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Bell, BookOpen, Calendar, ExternalLink, Newspaper, Sparkles } from 'lucide-react';
import type { PostData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultSiteSettings } from '@/sanity/lib/types';
import { PageHeader } from '@/components/ui/page-header';
import { cleanStega, formatDate } from './utils';
import { InsightArticle } from './detail/insight-article';
import { InformationGuide } from './detail/information-guide';
import { AnnouncementNotice } from './detail/announcement-notice';
import { NewsStory } from './detail/news-story';

import { getIconComponent } from '@/sanity/lib/iconLibrary';

interface InsightsDetailProps {
  post: PostData | null;
  slug: string;
  settings?: SiteSettingsData;
}

export function InsightsDetail({
  post,
  slug,
  settings = defaultSiteSettings,
}: InsightsDetailProps) {
  if (!post) {
    return (
      <div className="flex min-h-[60vh] flex-col justify-center">
        <PageHeader
          eyebrow="POST NOT FOUND"
          title="This article is"
          accent="not available yet."
          copy="Please return to the insights hub to explore published articles and updates."
        />
        <div className="mx-auto mt-8">
          <Link
            href="/insights"
            className="bg-accent text-bg-primary rounded-xs inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-90"
          >
            ← Back to insights hub
          </Link>
        </div>
      </div>
    );
  }

  const rawKind = cleanStega(post.kind);
  const kind =
    rawKind === 'news'
      ? 'news'
      : rawKind === 'announcement' || rawKind === 'announcements'
        ? 'announcement'
        : rawKind === 'information' || rawKind === 'info'
          ? 'information'
          : 'insight';

  const formattedDate = formatDate(post.publishedAt, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const CustomIcon = getIconComponent(post.iconName);

  return (
    <div className="bg-bg-app">
      {/* 01. Post Header Banner */}
      <section className="border-border-subtle bg-bg-surface border-b px-6 pt-16 pb-12 md:px-12 md:pt-24 md:pb-16">
        <div className="mx-auto max-w-4xl">
          {/* Navigation Breadcrumb */}
          <Link
            href="/insights"
            className="text-text-muted hover:text-accent mb-8 inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors"
          >
            <ArrowLeft size={15} /> Back to insights & updates
          </Link>

          {/* Type Badge & Meta */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {kind === 'insight' && (
              <span className="bg-accent/15 text-accent border-accent/30 rounded-full inline-flex items-center gap-1.5 border px-3.5 py-1 text-xs font-bold tracking-wider uppercase">
                {CustomIcon ? <CustomIcon size={13} /> : <Sparkles size={13} />} Insight Article
              </span>
            )}
            {kind === 'information' && (
              <span className="bg-bg-primary/10 text-accent border-border-subtle rounded-full inline-flex items-center gap-1.5 border px-3.5 py-1 text-xs font-bold tracking-wider uppercase">
                {CustomIcon ? <CustomIcon size={13} /> : <BookOpen size={13} />} Practical Guide
              </span>
            )}
            {kind === 'announcement' && (
              <span className="bg-accent/20 text-accent border-accent/40 rounded-full inline-flex items-center gap-1.5 border px-3.5 py-1 text-xs font-bold tracking-wider uppercase">
                {CustomIcon ? <CustomIcon size={13} /> : <Bell size={13} />} Official Notice
              </span>
            )}
            {kind === 'news' && (
              <span className="bg-bg-primary/10 text-text-main border-border-subtle rounded-full inline-flex items-center gap-1.5 border px-3.5 py-1 text-xs font-bold tracking-wider uppercase">
                {CustomIcon ? <CustomIcon size={13} /> : <Newspaper size={13} />} Immigration News
              </span>
            )}

            {formattedDate && (
              <span className="text-text-muted flex items-center gap-1.5 text-xs">
                <Calendar size={13} /> {formattedDate}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-text-main mb-6 font-serif text-3xl leading-tight font-normal sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-text-muted max-w-3xl font-serif text-lg leading-relaxed italic sm:text-xl">
              {post.excerpt}
            </p>
          )}

          {/* Author Byline / Meta Bar */}
          <div className="border-border-subtle mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
            <div className="flex items-center gap-3">
              {post.authorPhotoUrl ? (
                <div className="relative h-10 w-10 overflow-hidden rounded-full border">
                  <Image
                    src={post.authorPhotoUrl}
                    alt={post.authorName || 'Author'}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="bg-accent/15 text-accent flex h-10 w-10 items-center justify-center rounded-full font-serif font-bold">
                  {post.authorName ? post.authorName.charAt(0) : 'E'}
                </div>
              )}
              <div>
                <strong className="text-text-main block text-sm font-semibold">
                  {post.authorName || 'Nazly Sunguroglu, RCIC'}
                </strong>
                <span className="text-text-muted block text-xs">
                  {post.authorRole || 'Regulated Canadian Immigration Consultant'}
                </span>
              </div>
            </div>

            {post.sourceURL && (
              <a
                href={post.sourceURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase"
              >
                Original Source <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 02. Diversified Body Presentation by Kind */}
      <section className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        {post.coverImageUrl && (
          <div className="relative mb-12 h-72 w-full overflow-hidden rounded-sm border sm:h-96 md:h-110">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {kind === 'insight' && <InsightArticle post={post} settings={settings} />}
        {kind === 'information' && <InformationGuide post={post} settings={settings} />}
        {kind === 'announcement' && (
          <AnnouncementNotice post={post} formattedDate={formattedDate} settings={settings} />
        )}
        {kind === 'news' && <NewsStory post={post} settings={settings} />}
      </section>
    </div>
  );
}
