import { BookOpen, CheckCircle2 } from 'lucide-react';
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

export function InformationGuide({
  post,
  settings = defaultSiteSettings,
}: InformationGuideProps) {
  const items = post.checklistItems && post.checklistItems.length > 0 ? post.checklistItems : defaultChecklist;
  const ChecklistIcon = getIconComponent(post.checklistIcon) || BookOpen;

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      {/* Action Checklist Box */}
      <div className="rounded-sm border border-border-subtle bg-bg-surface p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-accent/10 p-2.5 text-accent">
            <ChecklistIcon size={22} />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-text-main">
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
                className="flex items-start gap-3 rounded-xs border border-border-subtle bg-bg-app p-3 text-xs leading-relaxed text-text-main md:text-sm"
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
      <div className="rounded-sm border border-accent/20 bg-accent/5 p-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <h4 className="font-serif text-base font-bold text-text-main">
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
    </div>
  );
}
