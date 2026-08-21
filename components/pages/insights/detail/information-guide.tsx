import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import type { PostData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultSiteSettings } from '@/sanity/lib/types';
import { resolveCtaLink } from '@/sanity/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { portableTextComponents } from './portable-text';
import { getIconComponent } from '@/sanity/lib/iconLibrary';

interface InformationGuideProps {
  post: PostData;
  settings?: SiteSettingsData;
}

const defaultChecklist = [
  'Verify Primary Applicant Eligibility & TEER Classification',
  'Conduct Comprehensive Financial Proof & Bank Audit',
  'Gather Police Clearances & Upfront Medical Certificates',
  'Ensure Certified Translations for All Non-English Documents',
];

export function InformationGuide({ post, settings = defaultSiteSettings }: InformationGuideProps) {
  const items =
    post.checklistItems && post.checklistItems.length > 0 ? post.checklistItems : defaultChecklist;
  const ChecklistIcon = getIconComponent(post.checklistIcon) || BookOpen;

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      {/* Action Checklist Box */}
      <div className="border-border-subtle bg-bg-surface rounded-sm border p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-accent/10 text-accent rounded-full p-2.5">
            <ChecklistIcon size={22} />
          </div>
          <div>
            <h3 className="text-text-main font-serif text-lg font-bold">
              {post.checklistTitle || 'Guide Summary & Action Checklist'}
            </h3>
            <p className="text-text-muted text-xs">
              {post.checklistDescription ||
                'Review this verified checklist before initiating your application to prevent common IRCC processing delays and documentation errors.'}
            </p>
          </div>
        </div>

        {post.checklistItems && post.checklistItems.length > 0 && (
          <ul className="mt-6 space-y-3">
            {post.checklistItems.map((item, idx) => (
              <li
                key={idx}
                className="border-border-subtle bg-bg-app text-text-main flex items-start gap-3 rounded-xs border p-3 text-xs leading-relaxed md:text-sm"
              >
                <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Main Guide Content */}
      <div className="prose prose-sm md:prose-base max-w-none">
        {post.content ? (
          <PortableText value={post.content} components={portableTextComponents} />
        ) : (
          <p className="text-text-muted italic">Content coming soon.</p>
        )}
      </div>

      {/* Audit / Documentation CTA Box */}
      <div className="border-accent/20 bg-accent/5 rounded-sm border p-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <h4 className="text-text-main font-serif text-base font-bold">
              {post.infoCtaTitle || 'Need assistance with this documentation?'}
            </h4>
            <p className="text-text-muted text-xs">
              {post.infoCtaSubtitle ||
                'Our team provides complete document audits and file representation.'}
            </p>
          </div>
          <Button
            href={resolveCtaLink(
              post.infoCtaButtonLink,
              settings?.whatsappNumber,
              post.authorName
                ? `Hello ${post.authorName.split(',')[0].trim()}, I would like guidance on: ${post.title}`
                : `Hello, I would like guidance on: ${post.title}`
            )}
            variant="primary"
            size="sm"
          >
            {post.infoCtaButtonText || 'Schedule Audit'}
          </Button>
        </div>
      </div>

      {/* Bottom Navigation Row */}
      <div className="border-border-subtle flex flex-wrap items-center justify-between gap-4 border-t pt-6">
        <Link
          href="/information"
          className="text-text-muted hover:text-accent inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors"
        >
          <ArrowLeft size={15} /> Back to all information guides
        </Link>
        <Link
          href="/insights"
          className="text-text-muted hover:text-accent inline-flex items-center gap-1 text-xs font-semibold tracking-wider uppercase transition-colors"
        >
          Explore Insights Hub <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  );
}
