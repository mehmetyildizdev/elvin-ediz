'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, BookOpen, Calendar, CheckCircle2 } from 'lucide-react';
import type { InsightsPageData, PostData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultInsightsPage, defaultPosts, defaultSiteSettings } from '@/sanity/lib/types';
import { resolveCtaLink } from '@/sanity/lib/whatsapp';
import { PageHeader } from '@/components/ui/page-header';
import { cleanStega, formatDate, getLocalizedPostHref } from '../insights/utils';
import { getIconComponent } from '@/sanity/lib/iconLibrary';
import { ConsultationCard } from '../insights/sections/consultation-card';
import { Pagination } from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 5;

interface InformationListProps {
  insightsPageData?: InsightsPageData;
  posts?: PostData[];
  settings?: SiteSettingsData;
  lang?: string;
}

export function InformationList({
  insightsPageData = defaultInsightsPage,
  posts = [],
  settings = defaultSiteSettings,
  lang = 'en',
}: InformationListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const allPosts = posts && posts.length > 0 ? posts : defaultPosts;

  // Filter for information guides only
  const infoPosts = allPosts.filter((p) => {
    const k = cleanStega(p.kind);
    return k === 'information' || k === 'info';
  });

  const totalPages = Math.ceil(infoPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = infoPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const backHref = lang === 'en' ? '/insights' : `/${lang}/insights`;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* 01. Page Header */}
      <PageHeader
        eyebrow={insightsPageData.infoEyebrow || 'PRACTICAL GUIDES & DOCUMENTATION'}
        title={insightsPageData.infoTitleMain || 'Immigration'}
        accent={insightsPageData.infoTitleAccent || 'Knowledge Base & Guides'}
        copy={
          insightsPageData.infoDescription ||
          'Comprehensive practical guides, document checklists, and actionable regulatory steps for Canadian immigration pathways.'
        }
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
              <ArrowLeft size={15} />{' '}
              {insightsPageData.breadcrumbBackToHubText || 'Back to insights & updates'}
            </Link>

            {infoPosts.length > 0 && (
              <span className="text-text-muted text-xs">
                {infoPosts.length > ITEMS_PER_PAGE
                  ? `Showing ${startIndex + 1}–${Math.min(startIndex + ITEMS_PER_PAGE, infoPosts.length)} of ${infoPosts.length} practical guides`
                  : `Showing ${infoPosts.length} ${infoPosts.length === 1 ? 'practical guide' : 'practical guides'}`}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Main column */}
            <div className="lg:col-span-8">
              {infoPosts.length > 0 ? (
                <div className="space-y-8">
                  {paginatedPosts.map((post) => {
                    const GuideIcon = getIconComponent(post.iconName) || BookOpen;
                    const checklistCount = post.checklistItems?.length || 0;
                    const displayDate = post.publishedAt
                      ? formatDate(post.publishedAt, undefined, post.language || lang)
                      : null;
                    const postHref = getLocalizedPostHref(post, 'information', lang);

                    return (
                      <article
                        key={post._id || post.slug}
                        className="group border-border-subtle hover:border-accent/40 bg-bg-surface relative overflow-hidden rounded-sm border p-6 shadow-xs transition-all duration-300 hover:shadow-md sm:p-8"
                      >
                        {/* Guide Header Strip */}
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                          <span className="bg-accent/15 text-accent border-accent/25 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase">
                            <GuideIcon size={12} className="text-accent shrink-0" />
                            {post.category || insightsPageData.infoBadgeText || 'Practical Guide'}
                          </span>

                          <div className="flex items-center gap-3">
                            {checklistCount > 0 && (
                              <span className="bg-accent/10 text-accent rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                                {checklistCount}{' '}
                                {checklistCount === 1
                                  ? (insightsPageData.infoChecklistStepText || 'Checklist Step')
                                  : (insightsPageData.infoChecklistStepsText || 'Checklist Steps')}
                              </span>
                            )}
                            {displayDate && (
                              <span className="bg-bg-app border-border-subtle text-text-muted flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs">
                                <Calendar size={12} />
                                {displayDate}
                              </span>
                            )}
                          </div>
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

                        {/* Checklist Teaser Preview if available */}
                        {post.checklistItems && post.checklistItems.length > 0 && (
                          <div className="border-border-subtle/70 bg-bg-app mb-6 rounded-sm border p-4">
                            <strong className="text-text-main block text-xs font-semibold tracking-wider uppercase">
                              {insightsPageData.infoChecklistKeyItemsTitle ||
                                'Key Checklist Items:'}
                            </strong>
                            <ul className="mt-2 space-y-1.5">
                              {post.checklistItems.slice(0, 3).map((item, idx) => (
                                <li
                                  key={idx}
                                  className="text-text-muted flex items-start gap-2 text-xs leading-relaxed"
                                >
                                  <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                                  <span className="line-clamp-1">{item}</span>
                                </li>
                              ))}
                              {post.checklistItems.length > 3 && (
                                <li className="text-accent pt-1 text-[11px] font-medium">
                                  + {post.checklistItems.length - 3}{' '}
                                  {insightsPageData.infoMorePointsText ||
                                    'more checklist points in full guide'}
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                        {/* Bottom Action Row */}
                        <div className="border-border-subtle/50 flex flex-wrap items-center justify-between gap-4 border-t pt-4">
                          <Link
                            href={postHref}
                            className="text-accent group/btn inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase"
                          >
                            {insightsPageData.infoViewFullGuideActionText ||
                              'View full guide & checklist'}
                            <ArrowUpRight
                              size={14}
                              className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            />
                          </Link>

                          <a
                            href={resolveCtaLink(
                              post.infoCtaButtonLink,
                              settings?.whatsappNumber,
                              post.authorName
                                ? `Hello ${post.authorName.split(',')[0].trim()}, I would like guidance on the information guide: ${post.title}`
                                : `Hello, I would like guidance on the information guide: ${post.title}`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent bg-accent/10 hover:bg-accent hover:text-bg-primary inline-flex items-center gap-1.5 rounded-sm px-3.5 py-1.5 text-xs font-semibold transition-colors"
                          >
                            {post.infoCtaButtonText ||
                              insightsPageData.infoConsultantActionText ||
                              'Inquire with Consultant'}
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
                    prevText={insightsPageData.paginationPrevText}
                    nextText={insightsPageData.paginationNextText}
                  />
                </div>
              ) : (
                <div className="border-border-subtle bg-bg-surface rounded-sm border border-dashed p-12 text-center">
                  <BookOpen size={28} className="text-accent/60 mx-auto mb-3" />
                  <h3 className="text-text-main font-serif text-lg font-semibold">
                    No practical guides available
                  </h3>
                  <p className="text-text-muted mt-1 text-xs">
                    {insightsPageData.infoEmptyMessage ||
                      'Comprehensive immigration blueprints are currently being prepared.'}
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
