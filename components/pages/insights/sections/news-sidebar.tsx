import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Newspaper } from 'lucide-react';
import type { InsightsPageData, PostData } from '@/sanity/lib/types';
import { cleanStega, formatDate, getLocalizedPostHref } from '../utils';

interface NewsSidebarProps {
  insightsPageData: InsightsPageData;
  posts: PostData[];
  maxItems?: number;
  lang?: string;
}

export function NewsSidebar({
  insightsPageData,
  posts,
  maxItems = 3,
  lang = 'en',
}: NewsSidebarProps) {
  const displayedPosts = posts.slice(0, maxItems);
  const allNewsHref = lang === 'en' ? '/news' : `/${lang}/news`;

  return (
    <div id="news-sidebar" className="flex flex-col p-6 sm:p-7">
      <div className="border-border-subtle mb-6 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <span className="bg-accent/15 text-accent flex h-7 w-7 items-center justify-center rounded-full">
            <Newspaper size={14} />
          </span>
          <div>
            <span className="text-accent block text-[10px] font-bold tracking-widest uppercase">
              {insightsPageData.newsEyebrow || 'LATEST UPDATES'}
            </span>
            <h3 className="text-text-main font-serif text-lg font-semibold">
              {insightsPageData.newsTitle || 'Immigration News'}
            </h3>
          </div>
        </div>
        <Link
          href={allNewsHref}
          className="bg-accent/10 hover:bg-accent hover:text-bg-primary text-accent rounded-full px-2.5 py-0.5 text-[10px] font-bold transition-colors"
          title="See all news"
        >
          {insightsPageData.newsViewAllText || 'All →'}
        </Link>
      </div>

      {displayedPosts.length > 0 ? (
        <div className="divide-border-subtle flex flex-col divide-y">
          {displayedPosts.map((post) => {
            const postHref = getLocalizedPostHref(post, 'news', lang);
            return (
              <article key={post._id || post.slug} className="group py-4 first:pt-0 last:pb-0">
                <div className="mb-1.5 flex items-center justify-between text-[11px]">
                  <span className="bg-bg-app border-border-subtle text-accent rounded-full border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                    {post.category || post.sourceName || 'Canada News'}
                  </span>
                  {post.publishedAt && (
                    <span className="text-text-muted text-[11px]">
                      {formatDate(post.publishedAt, undefined, post.language || lang)}
                    </span>
                  )}
                </div>

                <h4 className="text-text-main group-hover:text-accent font-serif text-sm leading-snug font-semibold transition-colors">
                  <Link href={postHref}>{post.title}</Link>
                </h4>

                {post.excerpt && (
                  <p className="text-text-muted mt-1.5 line-clamp-2 text-xs leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between">
                  <Link
                    href={postHref}
                    className="text-accent group/btn inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase"
                  >
                    {insightsPageData.newsReadStoryText || 'Read story'}
                    <ArrowUpRight
                      size={12}
                      className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </Link>

                  {post.sourceURL && (
                    <a
                      href={post.sourceURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent inline-flex items-center gap-1 text-[10px] transition-colors"
                    >
                      {insightsPageData.newsSourceLabel || 'Source'}{' '}
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="text-text-muted text-xs">
          {insightsPageData.newsEmptyMessage || 'No recent news articles yet.'}
        </p>
      )}
    </div>
  );
}
