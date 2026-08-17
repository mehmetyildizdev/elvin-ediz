import { BookOpen, CheckCircle2 } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import type { PostData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultSiteSettings } from '@/sanity/lib/types';
import { getWhatsAppUrl } from '@/sanity/lib/whatsapp';
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
    <div className="flex flex-col gap-8">
      {/* Guide Checklist / Executive Summary Callout (100% Click-Editable) */}
      <div className="border-accent/40 bg-bg-surface/90 rounded-sm border p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2.5">
          <ChecklistIcon size={20} className="text-accent" />
          <h2 className="text-text-main font-serif text-xl font-semibold">
            {post.checklistTitle || 'Guide Summary & Action Checklist'}
          </h2>
        </div>
        <p className="text-text-muted mb-6 text-sm leading-relaxed">
          {post.checklistDescription ||
            'Review this verified checklist before initiating your application to prevent common IRCC processing delays and documentation errors.'}
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="border-border-subtle bg-bg-app flex items-start gap-2.5 rounded-sm border p-3.5"
            >
              <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
              <span className="text-text-main text-xs font-medium leading-normal">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="border-border-subtle bg-bg-surface rounded-sm border p-6 md:p-10">
        {post.content && post.content.length > 0 ? (
          <div className="prose-container">
            <PortableText value={post.content} components={portableTextComponents} />
          </div>
        ) : (
          <div className="text-text-muted space-y-6 text-base leading-relaxed sm:text-lg">
            <h3 className="text-text-main font-serif text-2xl font-semibold">
              Detailed Step-by-Step Instructions
            </h3>
            <p>
              Preparation is the most critical stage of any Canadian visa or permanent residence
              application. Taking a structured approach minimizes back-and-forth correspondence with
              visa officers.
            </p>
            <p>
              When preparing documents, ensure every official paper clearly matches your identity
              records (passport, birth certificate, marriage certificate) and meets IRCC specifications
              for formatting, resolution, and translations.
            </p>
          </div>
        )}

        {/* Consultation CTA (100% Click-Editable) */}
        <div className="border-border-subtle bg-bg-app mt-10 flex flex-col justify-between gap-4 rounded-sm border p-6 sm:flex-row sm:items-center">
          <div>
            <h4 className="text-text-main font-serif text-lg font-semibold">
              {post.infoCtaTitle || 'Need assistance with this documentation?'}
            </h4>
            <p className="text-text-muted text-xs">
              {post.infoCtaSubtitle ||
                'Our team provides complete document audits and file representation.'}
            </p>
          </div>
          <Button
            href={
              post.infoCtaButtonLink ||
              getWhatsAppUrl(settings?.whatsappNumber, `Hello Nazly, I would like guidance on: ${post.title}`)
            }
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
