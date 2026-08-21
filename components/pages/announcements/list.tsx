'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Bell, Calendar } from 'lucide-react';
import type { InsightsPageData, PostData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultInsightsPage, defaultPosts, defaultSiteSettings } from '@/sanity/lib/types';
import { resolveCtaLink } from '@/sanity/lib/whatsapp';
import { PageHeader } from '@/components/ui/page-header';
import { cleanStega, formatDate, getLocalizedPostHref } from '../insights/utils';
import { getIconComponent } from '@/sanity/lib/iconLibrary';
import { ConsultationCard } from '../insights/sections/consultation-card';
import { Pagination } from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 5;

interface AnnouncementsListProps {
  insightsPageData?: InsightsPageData;
  posts?: PostData[];
  settings?: SiteSettingsData;
  lang?: string;
}

export function AnnouncementsList({
  insightsPageData = defaultInsightsPage,
  posts = [],
  settings = defaultSiteSettings,
  lang = 'en',
}: AnnouncementsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const allPosts = posts && posts.length > 0 ? posts : defaultPosts;

  // Filter for announcements only
  const announcementPosts = allPosts.filter((p) => {
    const k = cleanStega(p.kind);
    return k === 'announcement' || k === 'announcements';
  });

  const totalPages = Math.ceil(announcementPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = announcementPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const backHref = lang === 'en' ? '/insights' : `/${lang}/insights`;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* 01. Page Header */}
      <PageHeader
        eyebrow={insightsPageData.announcementsEyebrow || 'OFFICIAL NOTICES & BULLETINS'}
        title="Immigration"
        accent={insightsPageData.announcementsTitle || 'Announcements'}
        copy="Official policy directives, procedural advisories, and regulatory updates from Elvin Ediz Immigration Advisory."
      />

      {/* 02. Content Area */}
      <section className="bg-bg-app px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb back to main Insights Hub */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href={backHref}
              className="text-text-muted hover:text-accent inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors"
            >
              <ArrowLeft size={15} /> Back to insights & updates
            </Link>

            {announcementPosts.length > 0 && (
              <span className="text-text-muted text-xs">
                {announcementPosts.length > ITEMS_PER_PAGE
                  ? `Showing ${startIndex + 1}–${Math.min(startIndex + ITEMS_PER_PAGE, announcementPosts.length)} of ${announcementPosts.length} notices`
                  : `Showing ${announcementPosts.length} ${announcementPosts.length === 1 ? 'official notice' : 'official notices'}`}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Main column */}
            <div className="lg:col-span-8">
              {announcementPosts.length > 0 ? (
                <div className="space-y-8">
                  {paginatedPosts.map((post) => {
                    const NoticeIcon = getIconComponent(post.iconName) || Bell;
                    const displayEffectiveDate = post.effectiveDate
                      ? formatDate(post.effectiveDate)
                      : post.publishedAt
                        ? formatDate(post.publishedAt)
                        : null;
                    const postHref = getLocalizedPostHref(post, 'announcements', lang);

                    return (
                      <article
                        key={post._id || post.slug}
                        className="group border-border-subtle hover:border-accent/40 bg-bg-surface relative overflow-hidden rounded-sm border p-6 shadow-xs transition-all duration-300 hover:shadow-md sm:p-8"
                      >
                        {/* Notice Header Strip */}
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                          <span className="bg-accent/15 text-accent border-accent/25 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase">
                            <NoticeIcon size={12} className="text-accent shrink-0" />
                            {post.category || 'Official Notice'}
                          </span>

                          {displayEffectiveDate && (
                            <span className="bg-bg-app border-border-subtle text-text-muted flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs">
                              <Calendar size={12} />
                              Effective: {displayEffectiveDate}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-text-main group-hover:text-accent mb-3 font-serif text-xl leading-snug font-semibold transition-colors duration-200 sm:text-2xl">
                          <Link href={postHref}>{post.title}</Link>
                        </h3>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-text-muted mb-6 text-sm leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}

                        {/* Action Box Teaser if available */}
                        {post.announcementActionText && (
                          <div className="border-border-subtle/70 bg-bg-app mb-6 rounded-sm border p-4 text-xs">
                            <strong className="text-text-main block font-serif font-semibold">
                              {post.announcementActionTitle || 'Action Recommended:'}
                            </strong>
                            <p className="text-text-muted mt-1 line-clamp-2 leading-relaxed">
                              {post.announcementActionText}
                            </p>
                          </div>
                        )}

                        {/* Bottom Action Row */}
                        <div className="border-border-subtle/50 flex flex-wrap items-center justify-between gap-4 border-t pt-4">
                          <Link
                            href={postHref}
                            className="text-accent group/btn inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase"
                          >
                            View full notice & action steps
                            <ArrowUpRight
                              size={14}
                              className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            />
                          </Link>

                          <a
                            href={resolveCtaLink(
                              post.announcementCtaButtonLink,
                              settings?.whatsappNumber,
                              post.authorName
                                ? `Hello ${post.authorName.split(',')[0].trim()}, I have an inquiry regarding the announcement: ${post.title}`
                                : `Hello, I have an inquiry regarding the announcement: ${post.title}`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent bg-accent/10 hover:bg-accent hover:text-bg-primary inline-flex items-center gap-1.5 rounded-sm px-3.5 py-1.5 text-xs font-semibold transition-colors"
                          >
                            {post.announcementCtaButtonText || 'Inquire with RCIC'}
                          </a>
                        </div>
                      </article>
                    );
                  })}

                  {/* Pagination Controls */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              ) : (
                <div className="border-border-subtle bg-bg-surface rounded-sm border border-dashed p-12 text-center">
                  <Bell size={28} className="text-accent/60 mx-auto mb-3" />
                  <h3 className="text-text-main font-serif text-lg font-semibold">
                    No active announcements
                  </h3>
                  <p className="text-text-muted mt-1 text-xs">
                    {insightsPageData.announcementsEmptyMessage ||
                      'There are no urgent regulatory bulletins at this time. All standard processing applies.'}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar column */}
            <div className="space-y-8 lg:col-span-4">
              <ConsultationCard
                insightsPageData={insightsPageData}
                settings={settings}
                variant="card"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
