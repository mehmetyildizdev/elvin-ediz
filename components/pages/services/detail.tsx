import Link from 'next/link';
import { ArrowLeft, CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-react';
import { ServiceData, SiteSettingsData, defaultSiteSettings } from '@/sanity/lib/types';
import { getWhatsAppUrl } from '@/sanity/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';

export function ServiceDetail({
  service,
  slug,
  settings = defaultSiteSettings,
}: {
  service?: ServiceData | null;
  slug: string;
  settings?: SiteSettingsData;
}) {
  const displayTitle = service?.title || slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const displaySummary = service?.summary || 'Comprehensive Canadian immigration consultation and representation.';
  const features = service?.features || [
    'Document Audit & Eligibility Verification',
    'CICC Authorized Legal Representation',
    'Customized Application Strategy',
  ];

  const consultationHref = getWhatsAppUrl(
    settings?.whatsappNumber,
    `Hello Nazly, I would like guidance on ${displayTitle}.`
  );

  return (
    <main>
      <PageHeader
        eyebrow="CANADIAN IMMIGRATION PATHWAY"
        title={displayTitle}
        accent="Consulting & Guidance"
        copy={displaySummary}
      />

      <section className="bg-bg-app mx-auto flex max-w-7xl flex-col px-6 py-16 md:px-12 md:py-24">
        <Link
          href="/services"
          className="text-text-muted hover:text-accent mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={16} /> Back to all services
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="text-text-main mb-6 font-serif text-3xl font-semibold">
              Overview & Application Strategy
            </h2>
            <p className="text-text-muted mb-6 text-base leading-relaxed">
              At Elvin Ediz Immigration Services, every case for {displayTitle} is managed under the direct supervision of Nazly Sunguroglu, RCIC. We analyze your qualifications, gather verified documentation, and construct a robust application that addresses IRCC criteria.
            </p>

            <h3 className="text-text-main mb-4 font-serif text-2xl font-semibold">
              Key Program Features & Services Included
            </h3>
            <ul className="mb-10 space-y-4">
              {features.map((feat, i) => (
                <li key={i} className="border-border-subtle bg-bg-surface flex items-start gap-3 rounded-sm border p-4">
                  <CheckCircle2 size={20} className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-text-main text-sm font-semibold">{feat}</strong>
                    <p className="text-text-muted mt-0.5 text-xs leading-relaxed">
                      Tailored representation and thorough documentation audit according to Canadian immigration regulations.
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-border-subtle bg-bg-surface/60 rounded-sm border p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck size={24} className="text-accent" />
                <h4 className="text-text-main font-serif text-lg font-semibold">
                  CICC Regulated Representation
                </h4>
              </div>
              <p className="text-text-muted mt-2 text-sm leading-relaxed">
                As a Regulated Canadian Immigration Consultant (RCIC), Nazly Sunguroglu is authorized under Canadian federal law to represent your application before Immigration, Refugees and Citizenship Canada (IRCC).
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-bg-primary text-text-on-dark sticky top-28 flex flex-col gap-6 rounded-sm p-8 shadow-xl">
              <div>
                <span className="text-accent text-xs font-bold uppercase tracking-wider">
                  Ready to apply?
                </span>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-white">
                  Schedule your consultation
                </h3>
                <p className="text-text-on-dark-muted mt-2 text-xs leading-relaxed">
                  Connect via WhatsApp for a direct 1-on-1 consultation regarding your eligibility for {displayTitle}.
                </p>
              </div>

              <Button href={consultationHref} variant="primary" size="md" className="w-full">
                <PhoneCall size={16} /> Free Consultation
              </Button>

              <div className="border-border-on-dark/20 border-t pt-4 text-xs">
                <p className="text-text-on-dark-muted">
                  <strong>Office Location:</strong> {settings?.address || 'Toronto, Ontario, Canada'}
                  <br />
                  <strong>Direct Line / WhatsApp:</strong> {settings?.phone || settings?.whatsappNumber || '123456789'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
