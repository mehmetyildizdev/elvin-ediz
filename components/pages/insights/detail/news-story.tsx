import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  ExternalLink,
  Globe,
  MessageSquare,
  Newspaper,
  Tag,
} from 'lucide-react';
import { PortableText } from '@portabletext/react';
import type { PostData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultSiteSettings } from '@/sanity/lib/types';
import { resolveCtaLink } from '@/sanity/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { portableTextComponents } from './portable-text';
import { getIconComponent } from '@/sanity/lib/iconLibrary';

interface NewsStoryProps {
  post: PostData;
  settings?: SiteSettingsData;
}

export function NewsStory({ post, settings = defaultSiteSettings }: NewsStoryProps) {
  const NewsIcon = getIconComponent(post.iconName) || Newspaper;

  return (
    <div className="flex flex-col gap-10">
      {/* ------------------------------------------------------------- */}
      {/* 01. Magazine / News Media Masthead Bar                        */}
      {/* ------------------------------------------------------------- */}
      <div className="border-border-subtle bg-bg-surface flex flex-wrap items-center justify-between gap-4 rounded-sm border p-4 shadow-xs sm:px-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="bg-accent/15 text-accent rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase">
            {post.category || 'Canada Living & News'}
          </span>
          {post.readTime && (
            <span className="text-text-muted flex items-center gap-1 text-xs">
              <Clock size={12} /> {post.readTime}
            </span>
          )}
        </div>

        {/* Source / Publisher Attribution */}
        {post.sourceName && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-muted">Source:</span>
            {post.sourceURL ? (
              <a
                href={post.sourceURL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-app border-border-subtle text-accent hover:border-accent/40 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-semibold transition-colors"
              >
                <Globe size={12} />
                {post.sourceName}
                <ExternalLink size={11} />
              </a>
            ) : (
              <span className="bg-bg-app border-border-subtle text-text-main rounded-full border px-3 py-1 font-semibold">
                {post.sourceName}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 02. News Article Body & Right Editorial Sidebar               */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Main Article Content (8 cols) */}
        <div className="border-border-subtle bg-bg-surface rounded-sm border p-6 md:p-10 lg:col-span-8">
          {post.content && post.content.length > 0 ? (
            <div className="prose-container">
              <PortableText value={post.content} components={portableTextComponents} />
            </div>
          ) : (
            <div className="text-text-muted space-y-6 text-base leading-relaxed sm:text-lg">
              <p>
                Canada continues to see dynamic economic, regional, and cultural developments across
                its provinces and metropolitan areas. Staying informed on emerging lifestyle trends,
                job market shifts, and community stories helps both residents and future newcomers
                connect with life in Canada.
              </p>
              <p>
                From housing infrastructure updates to regional technology investments and seasonal
                living insights, this news story highlights important factors shaping everyday
                opportunities.
              </p>
            </div>
          )}

          {/* Original Source Reference Footer */}
          {post.sourceURL && (
            <div className="border-border-subtle bg-bg-app mt-8 flex flex-col justify-between gap-3 rounded-sm border p-4 text-xs sm:flex-row sm:items-center">
              <span className="text-text-muted">
                Original coverage published by{' '}
                <strong className="text-text-main">{post.sourceName || 'News Media Outlet'}</strong>
              </span>
              <a
                href={post.sourceURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent inline-flex items-center gap-1 font-semibold hover:underline"
              >
                Read full article on {post.sourceName || 'Source'} <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>

        {/* Right Sidebar (4 cols): Consultant Advisory Note & Actions */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          {/* Optional Consultant Take / Note */}
          {post.editorialNote && (
            <div className="border-accent/30 bg-bg-surface flex flex-col gap-3 rounded-sm border p-6 shadow-xs">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-accent" />
                <h4 className="text-text-main font-serif text-base font-semibold">
                  Advisory Perspective
                </h4>
              </div>
              <p className="text-text-muted text-xs leading-relaxed italic">
                &ldquo;{post.editorialNote}&rdquo;
              </p>
              <span className="text-accent border-border-subtle border-t pt-2 text-[10px] font-bold tracking-wider uppercase">
                Elvin Ediz Immigration Advisory
              </span>
            </div>
          )}

          {/* Connect on WhatsApp CTA */}
          <div className="bg-bg-primary text-text-on-dark flex flex-col gap-3 rounded-sm p-6 shadow-sm">
            <h4 className="font-serif text-lg font-semibold text-white">
              Questions about life or opportunities in Canada?
            </h4>
            <p className="text-text-on-dark-muted text-xs leading-relaxed">
              Reach out to our team for tailored guidance on studying, working, or settling in
              Canada.
            </p>
            <Button
              href={resolveCtaLink(
                null,
                settings?.whatsappNumber,
                post.authorName
                  ? `Hello ${post.authorName.split(',')[0].trim()}, I have questions regarding: ${post.title}`
                  : `Hello, I have questions regarding: ${post.title}`
              )}
              variant="primary"
              size="sm"
              className="mt-2 w-full"
            >
              Ask on WhatsApp <ArrowUpRight size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 03. Bottom Navigation Bar                                     */}
      {/* ------------------------------------------------------------- */}
      <div className="border-border-subtle bg-bg-surface flex flex-wrap items-center justify-between gap-4 rounded-sm border p-6 shadow-xs">
        <Link
          href="/news"
          className="text-text-muted hover:text-accent text-xs font-bold tracking-wider uppercase transition-colors"
        >
          ← See all recent news
        </Link>
        <Link
          href="/insights"
          className="text-text-muted hover:text-accent text-xs font-bold tracking-wider uppercase transition-colors"
        >
          View full insights hub →
        </Link>
      </div>
    </div>
  );
}
