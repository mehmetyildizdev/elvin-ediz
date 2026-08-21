import Link from 'next/link';
import { Bell } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import type { PostData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultSiteSettings } from '@/sanity/lib/types';
import { resolveCtaLink } from '@/sanity/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { portableTextComponents } from './portable-text';
import { getIconComponent } from '@/sanity/lib/iconLibrary';
import { formatDate } from '../utils';

interface AnnouncementNoticeProps {
  post: PostData;
  formattedDate?: string;
  settings?: SiteSettingsData;
}

export function AnnouncementNotice({
  post,
  formattedDate,
  settings = defaultSiteSettings,
}: AnnouncementNoticeProps) {
  const NoticeIcon = getIconComponent(post.announcementNoticeIcon) || Bell;

  const displayEffectiveDate = post.effectiveDate
    ? formatDate(post.effectiveDate, { month: 'long', day: 'numeric', year: 'numeric' })
    : formattedDate;

  return (
    <div className="border-border-subtle bg-bg-surface flex flex-col rounded-sm border p-6 shadow-xs md:p-10">
      {/* Official Notice Header */}
      <div className="border-border-subtle mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div className="flex items-center gap-3">
          <span className="bg-accent/20 text-accent flex h-10 w-10 items-center justify-center rounded-full">
            <NoticeIcon size={20} />
          </span>
          <div>
            <span className="text-accent block text-xs font-bold tracking-widest uppercase">
              {post.announcementNoticeEyebrow || 'Official Notice & Bulletin'}
            </span>
            <h2 className="text-text-main font-serif text-xl font-semibold">
              {post.announcementNoticeTitle || 'Elvin Ediz Immigration Advisory'}
            </h2>
          </div>
        </div>

        {displayEffectiveDate && (
          <span className="bg-bg-app border-border-subtle text-text-muted rounded-full border px-3 py-1 text-xs">
            Effective: {displayEffectiveDate}
          </span>
        )}
      </div>

      {/* Main Body Content */}
      {post.content && post.content.length > 0 ? (
        <div className="prose-container">
          <PortableText value={post.content} components={portableTextComponents} />
        </div>
      ) : (
        <div className="text-text-muted space-y-6 text-base leading-relaxed sm:text-lg">
          <p>
            Please take note of this official announcement regarding policy procedures, schedule
            adjustments, or regulatory requirement updates from Immigration, Refugees and
            Citizenship Canada (IRCC).
          </p>
        </div>
      )}

      {/* Action Recommended Box (Always Rendered & 100% Click-Editable) */}
      <div className="border-border-subtle bg-bg-app mt-8 rounded-sm border p-6">
        <h4 className="text-text-main mb-2 font-serif text-base font-semibold">
          {post.announcementActionTitle || 'Client Action Recommended:'}
        </h4>
        <p className="text-text-muted text-sm leading-relaxed">
          {post.announcementActionText ||
            'Existing clients whose applications are directly affected by this notice will be contacted individually by our case processing team. If you have upcoming deadlines or queries, please reach out via your client communication channel.'}
        </p>
      </div>

      {/* Footer Navigation & CTA */}
      <div className="border-border-subtle mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
        <Link
          href="/announcements"
          className="text-text-muted hover:text-accent text-xs font-bold tracking-wider uppercase transition-colors"
        >
          ← See all recent announcements
        </Link>
        <Button
          href={resolveCtaLink(
            post.announcementCtaButtonLink,
            settings?.whatsappNumber,
            post.authorName
              ? `Hello ${post.authorName.split(',')[0].trim()}, I have an inquiry regarding the announcement: ${post.title}`
              : `Hello, I have an inquiry regarding the announcement: ${post.title}`
          )}
          variant="outline-on-light"
          size="sm"
        >
          {post.announcementCtaButtonText || 'Inquire on WhatsApp'}
        </Button>
      </div>
    </div>
  );
}
