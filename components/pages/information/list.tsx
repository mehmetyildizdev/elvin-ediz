'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, BookOpen, Calendar, CheckCircle2 } from 'lucide-react';
import type { InsightsPageData, PostData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultInsightsPage, defaultPosts, defaultSiteSettings } from '@/sanity/lib/types';
import { resolveCtaLink } from '@/sanity/lib/whatsapp';
import { PageHeader } from '@/components/ui/page-header';
import { cleanStega, formatDate } from '../insights/utils';
import { getIconComponent } from '@/sanity/lib/iconLibrary';
import { ConsultationCard } from '../insights/sections/consultation-card';
import { Pagination } from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 5;

interface InformationListProps {
  insightsPageData?: InsightsPageData;
  posts?: PostData[];
  settings?: SiteSettingsData;
}

export function InformationList({
  insightsPageData = defaultInsightsPage,
  posts = [],
  settings = defaultSiteSettings,
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
              href="/insights"
              className="text-text-muted hover:text-accent inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors"
            >
              <ArrowLeft size={15} /> Back to all insights & updates
            </Link>

            {infoPosts.length > 0 && (
              <span className="text-text-muted text-xs">
                {infoPosts.length > ITEMS_PER_PAGE
                  ? `Showing ${startIndex + 1}–${Math.min(startIndex + ITEMS_PER_PAGE, infoPosts.length)} of ${infoPosts.length} practical guides`
                  : `Showing ${infoPosts.length} practical ${infoPosts.length === 1 ? 'guide' : 'guides'}`}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* LEFT COLUMN: Information Guides list */}
            <div className="flex flex-col gap-8 lg:col-span-8">
              {paginatedPosts.length > 0 ? (
                <>
                  {paginatedPosts.map((post) => {
                    const GuideIcon =
                      getIconComponent(post.checklistIcon || post.iconName) || BookOpen;
                    const displayDate = post.publishedAt
                      ? formatDate(post.publishedAt, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : '';
                    const checklistCount = post.checklistItems?.length || 0;

                    return (
                      <article
                        key={post._id || post.slug}
                        className="group border-border-subtle hover:border-accent/40 bg-bg-surface flex flex-col rounded-sm border p-6 transition-all duration-300 hover:shadow-md md:p-8"
                      >
                        {/* Top Meta Bar */}
                        <div className="border-border-subtle/70 mb-5 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
                          <div className="flex items-center gap-2.5">
                            <span className="bg-accent/15 text-accent flex h-8 w-8 items-center justify-center rounded-full">
                              <GuideIcon size={16} />
                            </span>
                            <div>
                              <span className="text-accent block text-[10px] font-bold tracking-widest uppercase">
                                Practical Guide
                              </span>
                              <span className="text-text-main font-serif text-sm font-semibold">
                                {post.checklistTitle || 'Guide & Documentation Checklist'}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {checklistCount > 0 && (
                              <span className="bg-accent/10 text-accent rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                                {checklistCount} Checklist {checklistCount === 1 ? 'Step' : 'Steps'}
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
                          <Link href={`/information/${cleanStega(post.slug)}`}>{post.title}</Link>
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
                              Key Checklist Items:
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
                                  + {post.checklistItems.length - 3} more checklist points in full
                                  guide
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                        {/* Bottom Action Row */}
                        <div className="border-border-subtle/50 flex flex-wrap items-center justify-between gap-4 border-t pt-4">
                          <Link
                            href={`/information/${cleanStega(post.slug)}`}
                            className="text-accent group/btn inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase"
                          >
                            View full guide & checklist
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
                            className="text-text-muted hover:text-accent inline-flex items-center gap-1 text-xs font-medium transition-colors"
                          >
                            {post.infoCtaButtonText || 'Schedule Audit on WhatsApp'}
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
                </>
              ) : (
                <div className="border-border-subtle bg-bg-surface rounded-sm border border-dashed p-12 text-center">
                  <BookOpen size={28} className="text-accent/60 mx-auto mb-3" />
                  <h3 className="text-text-main font-serif text-lg font-semibold">
                    No Information Guides at this time
                  </h3>
                  <p className="text-text-muted mt-1 text-xs">
                    Practical guides, document requirements, and instructions will appear here soon.
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR: Consultation Card */}
            <div className="flex flex-col gap-8 lg:col-span-4">
              <ConsultationCard insightsPageData={insightsPageData} settings={settings} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
