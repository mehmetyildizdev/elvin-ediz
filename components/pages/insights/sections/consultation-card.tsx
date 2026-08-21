import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import type { InsightsPageData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultSiteSettings } from '@/sanity/lib/types';
import { resolveCtaLink } from '@/sanity/lib/whatsapp';
import { Button } from '@/components/ui/button';

interface ConsultationCardProps {
  insightsPageData: InsightsPageData;
  settings?: SiteSettingsData;
  variant?: 'card' | 'embedded';
  className?: string;
}

export function ConsultationCard({
  insightsPageData,
  settings = defaultSiteSettings,
  variant = 'card',
  className = '',
}: ConsultationCardProps) {
  const buttonHref = resolveCtaLink(
    insightsPageData.consultationButtonLink,
    settings?.whatsappNumber
  );

  const containerClasses =
    variant === 'embedded'
      ? `flex flex-col gap-4 p-6 sm:p-7 ${className}`
      : `border-border-subtle bg-bg-surface flex flex-col gap-4 rounded-sm border p-6 shadow-xs ${className}`;

  return (
    <div className={containerClasses}>
      <div className="flex items-center gap-2">
        <ShieldCheck size={20} className="text-accent" />
        <span className="text-accent text-xs font-bold tracking-wider uppercase">
          {insightsPageData.consultationEyebrow || 'Direct Consultation'}
        </span>
      </div>
      <h4 className="text-text-main font-serif text-xl font-semibold">
        {insightsPageData.consultationTitle || 'Have a specific question about your case?'}
      </h4>
      <p className="text-text-muted text-xs leading-relaxed">
        {insightsPageData.consultationDescription ||
          'Connect with Nazly Sunguroglu, RCIC for a one-on-one assessment of your Canadian immigration pathway.'}
      </p>
      <Button href={buttonHref} variant="primary" size="sm" className="mt-2 w-full">
        {insightsPageData.consultationButtonText || 'Message on WhatsApp'}{' '}
        <ArrowUpRight size={14} />
      </Button>
    </div>
  );
}
