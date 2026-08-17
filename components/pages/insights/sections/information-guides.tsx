import Link from 'next/link';
import { ArrowUpRight, BookOpen, Calendar } from 'lucide-react';
import type { InsightsPageData, PostData } from '@/sanity/lib/types';
import { cleanStega, formatDate } from '../utils';

interface InformationGuidesProps {
  insightsPageData: InsightsPageData;
  posts: PostData[];
}

export function InformationGuides({ insightsPageData, posts }: InformationGuidesProps) {
  return (
    <div id="information-section" className="flex flex-col">
      <div className="border-border-subtle mb-8 flex flex-col justify-between gap-3 border-b pb-5">
        <span className="text-accent text-xs font-bold tracking-widest uppercase">
          {insightsPageData.infoEyebrow || 'PRACTICAL GUIDES & INFO'}
        </span>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-text-main font-serif text-3xl font-light tracking-tight sm:text-4xl">
            {insightsPageData.infoTitleMain || 'Immigration'}{' '}
            <span className="text-accent font-serif italic">
              {insightsPageData.infoTitleAccent || 'Knowledge Base'}
            </span>
          </h2>
          <Link
            href="/information"
            className="bg-accent/10 hover:bg-accent hover:text-bg-primary text-accent rounded-full px-3 py-1 text-xs font-bold transition-colors"
            title="See all information guides"
          >
            All Guides →
          </Link>
        </div>
        {insightsPageData.infoDescription && (
          <p className="text-text-muted text-sm leading-relaxed">
            {insightsPageData.infoDescription}
          </p>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5">
          {posts.map((post) => (
            <article
              key={post._id || post.slug}
              className="group border-border-subtle hover:border-accent/40 bg-bg-surface/80 relative flex flex-col justify-between rounded-sm border p-6 transition-all duration-300 hover:shadow-md md:p-8"
            >
              {/* Top Indicator */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span className="bg-bg-primary/5 text-accent border-border-subtle inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold tracking-wider uppercase">
                  <BookOpen size={13} className="text-accent" />
                  Guide & Documentation
                </span>
                {post.publishedAt && (
                  <span className="text-text-muted flex items-center gap-1 text-xs">
                    <Calendar size={12} />
                    {formatDate(post.publishedAt)}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-text-main group-hover:text-accent mb-3 font-serif text-xl leading-snug font-semibold transition-colors duration-200 sm:text-2xl">
                <Link href={`/information/${cleanStega(post.slug)}`}>{post.title}</Link>
              </h3>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-text-muted mb-6 text-sm leading-relaxed">{post.excerpt}</p>
              )}

              {/* Bottom action row */}
              <div className="border-border-subtle/50 flex items-center justify-between border-t pt-4">
                <span className="text-text-muted text-xs">
                  Curated by Elvin Ediz Immigration Advisory
                </span>
                <Link
                  href={`/information/${cleanStega(post.slug)}`}
                  className="text-accent group/btn inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase"
                >
                  Explore guide
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="border-border-subtle bg-bg-surface rounded-sm border border-dashed p-10 text-center">
          <p className="text-text-muted text-sm">Practical guides will appear here soon.</p>
        </div>
      )}
    </div>
  );
}
