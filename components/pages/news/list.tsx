'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Clock, ExternalLink, Globe, Newspaper } from 'lucide-react';
import type { InsightsPageData, PostData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultInsightsPage, defaultPosts, defaultSiteSettings } from '@/sanity/lib/types';
import { PageHeader } from '@/components/ui/page-header';
import { cleanStega, formatDate, getLocalizedPostHref } from '../insights/utils';
import { ConsultationCard } from '../insights/sections/consultation-card';
import { Pagination } from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 5;

interface NewsListProps {
  insightsPageData?: InsightsPageData;
  posts?: PostData[];
  settings?: SiteSettingsData;
  lang?: string;
}

export function NewsList({
  insightsPageData = defaultInsightsPage,
  posts = [],
  settings = defaultSiteSettings,
  lang = 'en',
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
  const backHref = lang === 'en' ? '/insights' : `/${lang}/insights`;

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
          {/* Breadcrumb / Back Link */}
          <div className="mb-8">
            <Link
              href={backHref}
              className="text-text-muted hover:text-accent inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors"
            >
              <ArrowLeft size={14} /> Back to Insights Hub
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Main column */}
            <div className="lg:col-span-8">
              {newsPosts.length > 0 ? (
                <div className="space-y-8">
                  {/* FEATURED / TOP NEWS STORY (Page 1 only) */}
                  {featuredPost && (
                    <article className="border-border-subtle hover:border-accent/40 bg-bg-surface group overflow-hidden rounded-sm border shadow-xs transition-all duration-300 hover:shadow-md">
                      {featuredPost.coverImageUrl && (
                        <div className="relative aspect-video w-full overflow-hidden bg-black/5 sm:aspect-21/9">
                          <Image
                            src={featuredPost.coverImageUrl}
                            alt={featuredPost.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-103"
                            priority
                          />
                        </div>
                      )}

                      <div className="p-6 sm:p-8">
                        {/* Meta strip */}
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <span className="bg-accent/10 text-accent border-accent/25 rounded-full border px-3 py-1 font-bold tracking-wider uppercase">
                            {featuredPost.category || featuredPost.sourceName || 'Featured News'}
                          </span>

                          <div className="text-text-muted flex items-center gap-3">
                            {featuredPost.sourceName && (
                              <span className="flex items-center gap-1 font-medium">
                                <Globe size={12} className="text-accent" />
                                {featuredPost.sourceName}
                              </span>
                            )}
                            {featuredPost.publishedAt && (
                              <span className="flex items-center gap-1">
                                <Clock size={12} className="opacity-70" />
                                {formatDate(featuredPost.publishedAt)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-text-main group-hover:text-accent mb-4 font-serif text-2xl font-semibold transition-colors sm:text-3xl">
                          <Link href={getLocalizedPostHref(featuredPost, 'news', lang)}>
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
                            href={getLocalizedPostHref(featuredPost, 'news', lang)}
                            className="text-accent group/btn inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase"
                          >
                            Read story
                            <ArrowUpRight
                              size={14}
                              className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            />
                          </Link>
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
                              <Link href={getLocalizedPostHref(post, 'news', lang)}>
                                {post.title}
                              </Link>
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
                              href={getLocalizedPostHref(post, 'news', lang)}
                              className="text-accent group/btn inline-flex items-center gap-1 text-xs font-bold tracking-widest uppercase"
                            >
                              Read
                              <ArrowUpRight
                                size={13}
                                className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                              />
                            </Link>

                            {post.sourceURL && (
                              <a
                                href={post.sourceURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-muted hover:text-accent inline-flex items-center gap-1 text-[11px] transition-colors"
                              >
                                Source <ExternalLink size={10} />
                              </a>
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
                </div>
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
