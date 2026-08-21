import Link from 'next/link';
import { ArrowUpRight, Bell } from 'lucide-react';
import type { InsightsPageData, PostData } from '@/sanity/lib/types';
import { cleanStega, formatDate, getLocalizedPostHref } from '../utils';

interface AnnouncementsSidebarProps {
  insightsPageData: InsightsPageData;
  posts: PostData[];
  maxItems?: number;
  lang?: string;
}

export function AnnouncementsSidebar({
  insightsPageData,
  posts,
  maxItems = 3,
  lang = 'en',
}: AnnouncementsSidebarProps) {
  const displayedPosts = posts.slice(0, maxItems);
  const allAnnouncementsHref = lang === 'en' ? '/announcements' : `/${lang}/announcements`;

  return (
    <div id="announcements-sidebar" className="flex h-full flex-col p-6 sm:p-7">
      <div className="border-border-subtle mb-6 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <span className="bg-accent/15 text-accent flex h-7 w-7 items-center justify-center rounded-full">
            <Bell size={14} />
          </span>
          <div>
            <span className="text-accent block text-[10px] font-bold tracking-widest uppercase">
              {insightsPageData.announcementsEyebrow || 'OFFICIAL NOTICES'}
            </span>
            <h3 className="text-text-main font-serif text-lg font-semibold">
              {insightsPageData.announcementsTitle || 'Announcements'}
            </h3>
          </div>
        </div>
        <Link
          href={allAnnouncementsHref}
          className="bg-accent/10 hover:bg-accent hover:text-bg-primary text-accent rounded-full px-2.5 py-0.5 text-[10px] font-bold transition-colors"
          title="See all announcements"
        >
          {insightsPageData.announcementsViewAllText || 'All →'}
        </Link>
      </div>

      {displayedPosts.length > 0 ? (
        <div className="flex flex-1 flex-col justify-between gap-4">
          {displayedPosts.map((post) => {
            const postHref = getLocalizedPostHref(post, 'announcements', lang);
            return (
              <article
                key={post._id || post.slug}
                className="group border-border-subtle/70 bg-bg-app hover:border-accent/50 flex flex-1 flex-col justify-between rounded-sm border p-4 transition-all duration-200 hover:shadow-xs"
              >
                <div>
                  <div className="mb-2 flex items-center justify-between text-[11px]">
                    <span className="bg-accent/15 text-accent border-accent/25 rounded-full border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                      {insightsPageData.announcementsBadgeText || 'Official Notice'}
                    </span>
                    {post.publishedAt && (
                      <span className="text-text-muted text-[11px]">
                        {formatDate(post.publishedAt, undefined, post.language || lang)}
                      </span>
                    )}
                  </div>

                  <h4 className="text-text-main group-hover:text-accent font-serif text-base leading-snug font-semibold transition-colors">
                    <Link href={postHref}>{post.title}</Link>
                  </h4>

                  {post.excerpt && (
                    <p className="text-text-muted mt-2 line-clamp-2 text-xs leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                <Link
                  href={postHref}
                  className="text-accent group/btn mt-3 inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase"
                >
                  {insightsPageData.announcementsViewActionText || 'View announcement'}
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  />
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="text-text-muted text-xs">
          {insightsPageData.announcementsEmptyMessage || 'No urgent announcements at this time.'}
        </p>
      )}
    </div>
  );
}
