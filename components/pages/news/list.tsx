'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Clock, ExternalLink, Globe, Newspaper } from 'lucide-react';
import type { InsightsPageData, PostData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultInsightsPage, defaultPosts, defaultSiteSettings } from '@/sanity/lib/types';
import { PageHeader } from '@/components/ui/page-header';
import { cleanStega, formatDate } from '../insights/utils';
import { ConsultationCard } from '../insights/sections/consultation-card';
import { Pagination } from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 5;

interface NewsListProps {
  insightsPageData?: InsightsPageData;
  posts?: PostData[];
  settings?: SiteSettingsData;
}

export function NewsList({
  insightsPageData = defaultInsightsPage,
  posts = [],
  settings = defaultSiteSettings,
}: NewsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const allPosts = posts && posts.length > 0 ? posts : defaultPosts;

  // Filter for news only
  const newsPosts = allPosts.filter((p) => {
    const k = cleanStega(p.kind);
    return k === 'news';
  });

  const totalPages = Math.ceil(newsPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = newsPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const featuredPost = currentPage === 1 ? paginatedPosts[0] : null;
  const gridPosts = currentPage === 1 ? paginatedPosts.slice(1) : paginatedPosts;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* 01. Page Header */}
      <PageHeader
        eyebrow={insightsPageData.newsEyebrow || 'CURATED MEDIA & STORIES'}
        title="News &"
        accent={insightsPageData.newsTitle || 'Canada Updates'}
        copy="Curated news stories, seasonal perspectives, economic trends, and community highlights across Canada and beyond."
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
              <ArrowLeft size={15} /> Back to insights & updates
            </Link>

            {newsPosts.length > 0 && (
              <span className="text-text-muted text-xs">
                {newsPosts.length > ITEMS_PER_PAGE
                  ? `Showing ${startIndex + 1}–${Math.min(startIndex + ITEMS_PER_PAGE, newsPosts.length)} of ${newsPosts.length} curated stories`
                  : `Showing ${newsPosts.length} ${newsPosts.length === 1 ? 'curated story' : 'curated stories'}`}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* LEFT COLUMN: News Feed (8 cols) */}
            <div className="flex flex-col gap-10 lg:col-span-8">
              {paginatedPosts.length > 0 ? (
                <>
                  {/* FEATURED / LEAD NEWS STORY (Page 1 only) */}
                  {featuredPost && (
                    <article className="group border-border-subtle hover:border-accent/40 bg-bg-surface overflow-hidden rounded-sm border transition-all duration-300 hover:shadow-lg">
                      {featuredPost.coverImageUrl && (
                        <div className="relative h-64 w-full overflow-hidden sm:h-80">
                          <Image
                            src={featuredPost.coverImageUrl}
                            alt={featuredPost.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}

                      <div className="flex flex-col p-6 sm:p-8">
                        {/* Meta strip */}
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-accent/15 text-accent rounded-full px-3 py-0.5 text-[11px] font-bold tracking-wider uppercase">
                              {featuredPost.category || 'Featured News'}
                            </span>
                            {featuredPost.readTime && (
                              <span className="text-text-muted flex items-center gap-1 text-[11px]">
                                <Clock size={11} /> {featuredPost.readTime}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {featuredPost.sourceName && (
                              <span className="bg-bg-app border-border-subtle text-text-muted inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px]">
                                <Globe size={11} /> {featuredPost.sourceName}
                              </span>
                            )}
                            {featuredPost.publishedAt && (
                              <span className="text-text-muted text-[11px]">
                                {formatDate(featuredPost.publishedAt)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-text-main group-hover:text-accent mb-4 font-serif text-2xl font-semibold transition-colors sm:text-3xl">
                          <Link href={`/news/${cleanStega(featuredPost.slug)}`}>
                            {featuredPost.title}
                          </Link>
                        </h2>

                        {/* Excerpt */}
                        {featuredPost.excerpt && (
                          <p className="text-text-muted mb-6 text-sm leading-relaxed sm:text-base">
                            {featuredPost.excerpt}
                          </p>
                        )}

                        {/* Actions */}
                        <div className="border-border-subtle/60 flex flex-wrap items-center justify-between gap-4 border-t pt-4">
                          <Link
                            href={`/news/${cleanStega(featuredPost.slug)}`}
                            className="text-accent group/btn inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase"
                          >
                            Read story
                            <ArrowUpRight
                              size={14}
                              className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            />
                          </Link>

                          {featuredPost.sourceURL && (
                            <a
                              href={featuredPost.sourceURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-text-muted hover:text-accent inline-flex items-center gap-1 text-xs transition-colors"
                            >
                              Source Article <ExternalLink size={11} />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  )}

                  {/* REMAINING / GRID NEWS STORIES */}
                  {gridPosts.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {gridPosts.map((post) => (
                        <article
                          key={post._id || post.slug}
                          className="group border-border-subtle hover:border-accent/40 bg-bg-surface flex flex-col justify-between rounded-sm border p-6 transition-all duration-300 hover:shadow-md"
                        >
                          <div>
                            {/* Meta strip */}
                            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                              <span className="bg-bg-app border-border-subtle text-accent rounded-xs border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                                {post.category || 'News'}
                              </span>
                              {post.publishedAt && (
                                <span className="text-text-muted">
                                  {formatDate(post.publishedAt)}
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="text-text-main group-hover:text-accent mb-3 font-serif text-lg leading-snug font-semibold transition-colors">
                              <Link href={`/news/${cleanStega(post.slug)}`}>{post.title}</Link>
                            </h3>

                            {/* Excerpt */}
                            {post.excerpt && (
                              <p className="text-text-muted mb-4 line-clamp-3 text-xs leading-relaxed">
                                {post.excerpt}
                              </p>
                            )}
                          </div>

                          {/* Bottom row */}
                          <div className="border-border-subtle/60 mt-4 flex items-center justify-between border-t pt-3">
                            <Link
                              href={`/news/${cleanStega(post.slug)}`}
                              className="text-accent group/btn inline-flex items-center gap-1 text-xs font-bold tracking-widest uppercase"
                            >
                              Read
                              <ArrowUpRight
                                size={13}
                                className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                              />
                            </Link>

                            {post.sourceName && (
                              <span className="text-text-muted max-w-30 truncate text-[11px]">
                                {post.sourceName}
                              </span>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>
                  )}

                  {/* Pagination Controls */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="border-border-subtle bg-bg-surface rounded-sm border border-dashed p-12 text-center">
                  <Newspaper size={28} className="text-accent/60 mx-auto mb-3" />
                  <h3 className="text-text-main font-serif text-lg font-semibold">
                    No news articles published yet
                  </h3>
                  <p className="text-text-muted mt-1 text-xs">
                    {insightsPageData.newsEmptyMessage ||
                      'Check back regularly for Canadian community news, trends, and seasonal stories.'}
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR (4 cols): Consultation Card */}
            <div className="flex flex-col gap-8 lg:col-span-4">
              <ConsultationCard insightsPageData={insightsPageData} settings={settings} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
