'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Calendar, Sparkles } from 'lucide-react';
import type { InsightsPageData, PostData } from '@/sanity/lib/types';
import { cleanStega, formatDate } from '../utils';
import { getIconComponent } from '@/sanity/lib/iconLibrary';
import { Pagination } from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 2;

interface FeaturedInsightsProps {
  insightsPageData: InsightsPageData;
  posts: PostData[];
}

export function FeaturedInsights({ insightsPageData, posts }: FeaturedInsightsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('insights-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="insights-section" className="flex flex-col">
      {/* Category Section Header */}
      <div className="border-border-subtle mb-8 flex flex-col justify-between gap-3 border-b pb-6">
        <div className="flex items-center gap-2">
          <span className="bg-accent/15 text-accent flex h-6 w-6 items-center justify-center rounded-full">
            <Sparkles size={12} />
          </span>
          <span className="text-accent text-[11px] font-bold tracking-widest uppercase">
            {insightsPageData.insightsEyebrow || 'IN-DEPTH ARTICLES'}
          </span>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-text-main font-serif text-3xl font-light tracking-tight sm:text-4xl">
            {insightsPageData.insightsTitleMain || 'Featured'}{' '}
            <span className="text-accent font-serif italic">
              {insightsPageData.insightsTitleAccent || 'Insights'}
            </span>
          </h2>
        </div>
        {insightsPageData.insightsDescription && (
          <p className="text-text-muted max-w-2xl text-sm leading-relaxed">
            {insightsPageData.insightsDescription}
          </p>
        )}
      </div>

      {paginatedPosts.length > 0 ? (
        <>
          <div className="grid min-h-120 grid-cols-1 items-start gap-6 sm:grid-cols-2">
            {paginatedPosts.map((post, idx) => {
              const globalIdx = startIndex + idx;
              const PostIcon = getIconComponent(post.iconName) || Sparkles;
              return (
                <article
                  key={post._id || post.slug}
                  className="group border-border-subtle bg-bg-surface flex h-120 flex-col overflow-hidden rounded-sm border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                >
                  {/* Visual Cover / Glyph (Fixed Height) */}
                  <div className="bg-bg-primary/10 text-accent group-hover:bg-bg-primary/15 relative mb-5 flex h-44 w-full shrink-0 items-center justify-center overflow-hidden rounded-sm transition-colors select-none">
                    {post.coverImageUrl ? (
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1.5 font-serif">
                        <span className="text-5xl font-light italic">
                          {globalIdx === 0
                            ? 'CA'
                            : globalIdx === 1
                              ? 'EDU'
                              : globalIdx === 2
                                ? 'LMIA'
                                : globalIdx === 3
                                  ? 'FAM'
                                  : 'PNP'}
                        </span>
                        <span className="bg-bg-surface/80 border-border-subtle text-accent rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-semibold tracking-widest uppercase shadow-2xs">
                          {post.category || 'Insight'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Category Pill Tag & Date */}
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="bg-accent/10 text-accent border-accent/25 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                      <PostIcon size={12} className="text-accent shrink-0" />
                      {post.category || 'Insight'}
                    </span>
                    {post.publishedAt && (
                      <span className="text-text-muted flex items-center gap-1 text-[11px]">
                        <Calendar size={11} className="opacity-70" />
                        {formatDate(post.publishedAt)}
                      </span>
                    )}
                  </div>

                  {/* Title (Fixed 2-line height) */}
                  <h3 className="text-text-main group-hover:text-accent mb-3 line-clamp-2 h-13 font-serif text-lg leading-snug font-semibold transition-colors duration-200">
                    <Link href={`/insights/${cleanStega(post.slug)}`}>{post.title}</Link>
                  </h3>

                  {/* Excerpt (Line clamped) */}
                  {post.excerpt && (
                    <p className="text-text-muted mb-4 line-clamp-3 text-xs leading-relaxed sm:text-sm">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Read More Link (Pinned to bottom) */}
                  <Link
                    href={`/insights/${cleanStega(post.slug)}`}
                    className="text-accent group/btn mt-auto inline-flex items-center gap-1.5 self-start text-xs font-bold tracking-widest uppercase"
                  >
                    Read article
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </Link>
                </article>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="border-border-subtle bg-bg-surface rounded-sm border border-dashed p-10 text-center">
          <p className="text-text-muted text-sm">New insight articles will be published soon.</p>
        </div>
      )}
    </div>
  );
}
