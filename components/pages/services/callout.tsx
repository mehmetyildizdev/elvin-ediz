import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteSettingsData, defaultSiteSettings } from '@/sanity/lib/types';
import { getWhatsAppUrl } from '@/sanity/lib/whatsapp';

export function ServicesCallout({
  settings = defaultSiteSettings,
}: {
  settings?: SiteSettingsData;
}) {
  const consultationHref = getWhatsAppUrl(settings?.whatsappNumber);

  return (
    <section className="bg-bg-primary text-text-on-dark px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="text-accent mb-3 text-xs font-bold tracking-widest uppercase">
            NOT SURE WHERE TO BEGIN?
          </p>
          <h2 className="font-serif text-3xl leading-tight font-light sm:text-5xl md:text-5xl">
            We can find the
            <br />
            <span className="text-accent font-serif font-normal italic">right starting point.</span>
          </h2>
        </div>
        <Button
          href={consultationHref}
          variant="primary"
          size="md"
          className="self-start whitespace-nowrap md:self-center"
        >
          Free Consultation <ArrowUpRight size={16} />
        </Button>
      </div>
    </section>
  );
}
