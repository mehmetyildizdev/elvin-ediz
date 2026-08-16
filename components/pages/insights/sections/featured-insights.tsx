import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { InsightsPageData, PostData } from '@/sanity/lib/types';
import { cleanStega, formatDate } from '../utils';

interface FeaturedInsightsProps {
  insightsPageData: InsightsPageData;
  posts: PostData[];
}

export function FeaturedInsights({ insightsPageData, posts }: FeaturedInsightsProps) {
  return (
    <div id="insights-section" className="flex flex-col">
      <div className="border-border-subtle mb-8 flex flex-col justify-between gap-3 border-b pb-5">
        <span className="text-accent text-xs font-bold tracking-widest uppercase">
          {insightsPageData.insightsEyebrow || 'IN-DEPTH ARTICLES'}
        </span>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-text-main font-serif text-3xl font-light tracking-tight sm:text-4xl">
            {insightsPageData.insightsTitleMain || 'Featured'}{' '}
            <span className="text-accent font-serif italic">
              {insightsPageData.insightsTitleAccent || 'Insights'}
            </span>
          </h2>
        </div>
        {insightsPageData.insightsDescription && (
          <p className="text-text-muted text-sm leading-relaxed">
            {insightsPageData.insightsDescription}
          </p>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {posts.map((post, idx) => (
            <article
              key={post._id || post.slug}
              className="group border-border-subtle bg-bg-surface flex flex-col overflow-hidden rounded-sm border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              {/* Visual Cover / Glyph */}
              <div className="bg-bg-primary/10 text-accent group-hover:bg-bg-primary/15 relative mb-5 flex h-48 w-full items-center justify-center overflow-hidden rounded-sm transition-colors select-none">
                {post.coverImageUrl ? (
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1 font-serif">
                    <span className="text-5xl font-light italic">
                      {idx === 0 ? 'CA' : idx === 1 ? 'EDU' : '✦'}
                    </span>
                    <span className="font-sans text-[10px] tracking-widest uppercase opacity-70">
                      Immigration Perspective
                    </span>
                  </div>
                )}
              </div>

              {/* Metadata Tag & Date */}
              <div className="text-accent mb-2.5 flex items-center justify-between text-xs font-bold tracking-widest uppercase">
                <span className="flex items-center gap-1">
                  <Sparkles size={13} />
                  Insight
                </span>
                {post.publishedAt && (
                  <span className="text-text-muted font-sans font-normal lowercase">
                    {formatDate(post.publishedAt)}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-text-main group-hover:text-accent mb-3 font-serif text-xl leading-snug font-semibold transition-colors duration-200">
                <Link href={`/insights/${cleanStega(post.slug)}`}>{post.title}</Link>
              </h3>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-text-muted mb-6 line-clamp-3 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Read More Link */}
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
          ))}
        </div>
      ) : (
        <div className="border-border-subtle bg-bg-surface rounded-sm border border-dashed p-10 text-center">
          <p className="text-text-muted text-sm">New insight articles will be published soon.</p>
        </div>
      )}
    </div>
  );
}
