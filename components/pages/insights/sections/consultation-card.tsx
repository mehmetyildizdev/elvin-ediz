import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import type { InsightsPageData } from '@/sanity/lib/types';

interface ConsultationCardProps {
  insightsPageData: InsightsPageData;
}

export function ConsultationCard({ insightsPageData }: ConsultationCardProps) {
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
      <a
        href={insightsPageData.consultationButtonLink || 'https://wa.me/16475681009'}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-accent hover:bg-accent-hover text-bg-primary mt-2 inline-flex items-center justify-center gap-2 rounded-xs px-4 py-2.5 text-xs font-bold tracking-wider uppercase transition-colors"
      >
        {insightsPageData.consultationButtonText || 'Message on WhatsApp'}{' '}
        <ArrowUpRight size={14} />
      </a>
    </div>
  );
}
