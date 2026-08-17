import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import type { InsightsPageData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultSiteSettings } from '@/sanity/lib/types';
import { resolveCtaLink } from '@/sanity/lib/whatsapp';
import { Button } from '@/components/ui/button';

interface ConsultationCardProps {
  insightsPageData: InsightsPageData;
  settings?: SiteSettingsData;
}

export function ConsultationCard({
  insightsPageData,
  settings = defaultSiteSettings,
}: ConsultationCardProps) {
  const buttonHref = resolveCtaLink(
    insightsPageData.consultationButtonLink,
    settings?.whatsappNumber
  );

  return (
    <div className="bg-bg-primary text-text-on-dark flex flex-col gap-4 rounded-sm p-6 shadow-lg">
      <div className="flex items-center gap-2">
        <ShieldCheck size={20} className="text-accent" />
        <span className="text-accent text-xs font-bold tracking-wider uppercase">
          {insightsPageData.consultationEyebrow || 'Direct Consultation'}
        </span>
      </div>
      <h4 className="font-serif text-xl font-semibold text-white">
        {insightsPageData.consultationTitle || 'Have a specific question about your case?'}
      </h4>
      <p className="text-text-on-dark-muted text-xs leading-relaxed">
        {insightsPageData.consultationDescription ||
          'Connect with Nazly Sunguroglu, RCIC for a one-on-one assessment of your Canadian immigration pathway.'}
      </p>
      <Button
        href={buttonHref}
        variant="primary"
        size="sm"
        className="mt-2 w-full"
      >
        {insightsPageData.consultationButtonText || 'Message on WhatsApp'}{' '}
        <ArrowUpRight size={14} />
      </Button>
    </div>
  );
}
