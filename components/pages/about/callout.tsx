import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AboutPageData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultAboutPage, defaultSiteSettings } from '@/sanity/lib/types';
import { resolveCtaLink } from '@/sanity/lib/whatsapp';

export function AboutCallout({
  aboutData = defaultAboutPage,
  settings = defaultSiteSettings,
}: {
  aboutData?: AboutPageData;
  settings?: SiteSettingsData;
}) {
  return (
    <section className="border-border-subtle bg-bg-app relative overflow-hidden border-t px-6 py-20 md:px-12 md:py-28">
      {/* Decorative gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 select-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(200, 90, 50, 0.12), transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="text-accent mb-3 text-xs font-bold tracking-widest uppercase">
          {aboutData.ctaEyebrow || 'START YOUR JOURNEY'}
        </p>

        <h2 className="text-text-main mb-6 font-serif text-3xl leading-tight font-light sm:text-4xl md:text-5xl">
          {aboutData.ctaTitleMain || 'Ready to discuss your Canadian'}{' '}
          <span className="text-accent font-serif font-semibold italic">
            {aboutData.ctaTitleAccent || 'immigration goals?'}
          </span>
        </h2>

        <p className="text-text-muted mx-auto mb-10 max-w-2xl text-base leading-relaxed">
          {aboutData.ctaDescription ||
            'Book a strategic consultation with Nazly Sunguroglu, RCIC to evaluate your eligibility, understand current IRCC processing, and chart your optimal pathway.'}
        </p>

        <div className="flex justify-center">
          <Button
            href={resolveCtaLink(aboutData.ctaButtonLink, settings?.whatsappNumber)}
            variant="primary"
            size="lg"
          >
            {aboutData.ctaButtonText || 'Book Free Consultation'} <ArrowUpRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
