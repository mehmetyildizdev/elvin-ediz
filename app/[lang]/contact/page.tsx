import type { Metadata } from 'next';
import { ContactInfo } from '@/components/pages/contact/info';
import { ConsultationForm } from '@/components/home/contact';
import { fetchSiteSettings, fetchServices, fetchHomePage } from '@/sanity/lib/data';
import { buildPageMetadata, buildWebPageJsonLd } from '@/sanity/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { defaultLanguage, isValidLanguage } from '@/sanity/i18n';

export const revalidate = 1209600; // 2 weeks

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang = defaultLanguage } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;
  const [settings, homeData] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchHomePage(currentLang),
  ]);

  const canonicalPath = currentLang === defaultLanguage ? '/contact' : `/${currentLang}/contact`;

  return buildPageMetadata({
    pageTitle: 'Contact & Book Consultation | Elvin Ediz Immigration',
    pageDescription:
      'Book a confidential Canadian immigration consultation with Nazly Sunguroglu, RCIC. Inquire about Express Entry, Study & Work Permits, or Family Sponsorship in Toronto.',
    settings,
    canonicalPath,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang = defaultLanguage } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;

  const [settings, services, homeData] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchServices(currentLang),
    fetchHomePage(currentLang),
  ]);

  const canonicalPath = currentLang === defaultLanguage ? '/contact' : `/${currentLang}/contact`;

  const contactJsonLd = buildWebPageJsonLd({
    title: 'Contact & Book Consultation | Elvin Ediz Immigration',
    description: 'Book a consultation with Nazly Sunguroglu, RCIC.',
    url: canonicalPath,
    type: 'ContactPage',
    settings,
  });

  return (
    <>
      <JsonLd data={contactJsonLd} />
      <main className="bg-bg-primary text-text-on-dark flex min-h-[80vh] items-center px-6 py-20 md:px-24 lg:px-32">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="flex flex-col justify-center lg:col-span-5">
            <ContactInfo homeData={homeData} />
          </div>
          <div className="bg-bg-surface/10 border-border-on-dark rounded-sm border p-6 backdrop-blur-xs sm:p-10 lg:col-span-7">
            <ConsultationForm homeData={homeData} services={services} />
          </div>
        </div>
      </main>
    </>
  );
}
