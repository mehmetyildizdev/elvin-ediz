import Link from 'next/link';
import { ArrowUpRight, Bell } from 'lucide-react';
import type { InsightsPageData, PostData } from '@/sanity/lib/types';
import { cleanStega, formatDate } from '../utils';

interface AnnouncementsSidebarProps {
  insightsPageData: InsightsPageData;
  posts: PostData[];
}

export function AnnouncementsSidebar({ insightsPageData, posts }: AnnouncementsSidebarProps) {
  return (
    <div
      id="announcements-sidebar"
      className="border-border-subtle bg-bg-surface flex flex-col rounded-sm border p-6 shadow-xs"
    >
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
          href="/announcements"
          className="bg-accent/10 hover:bg-accent hover:text-bg-primary text-accent rounded-full px-2.5 py-0.5 text-[10px] font-bold transition-colors"
          title="See all announcements"
        >
          {posts.length} All →
        </Link>
      </div>

      {posts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <article
              key={post._id || post.slug}
              className="group border-border-subtle/70 bg-bg-app hover:border-accent/50 flex flex-col rounded-sm border p-4 transition-all duration-200 hover:shadow-xs"
            >
              <div className="mb-2 flex items-center justify-between text-[11px]">
                <span className="bg-accent/20 text-accent rounded-xs px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
                  Notice
                </span>
                {post.publishedAt && (
                  <span className="text-text-muted text-[11px]">{formatDate(post.publishedAt)}</span>
                )}
              </div>

              <h4 className="text-text-main group-hover:text-accent font-serif text-base leading-snug font-semibold transition-colors">
                <Link href={`/announcements/${cleanStega(post.slug)}`}>{post.title}</Link>
              </h4>

              {post.excerpt && (
                <p className="text-text-muted mt-2 line-clamp-2 text-xs leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              <Link
                href={`/announcements/${cleanStega(post.slug)}`}
                className="text-accent group/btn mt-3 inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase"
              >
                View announcement
                <ArrowUpRight
                  size={12}
                  className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-text-muted text-xs">
          {insightsPageData.announcementsEmptyMessage || 'No urgent announcements at this time.'}
        </p>
      )}
    </div>
  );
}
