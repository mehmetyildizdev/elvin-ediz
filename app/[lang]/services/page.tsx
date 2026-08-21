import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { TabbedServices } from '@/components/pages/services/tabbed-services';
import { ServicesCallout } from '@/components/pages/services/callout';
import { fetchSiteSettings, fetchServices, fetchServicesPage } from '@/sanity/lib/data';
import { buildPageMetadata, buildPageJsonLd } from '@/sanity/lib/seo';
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
  const [settings, servicesPageData] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchServicesPage(currentLang),
  ]);

  const canonicalPath = currentLang === defaultLanguage ? '/services' : `/${currentLang}/services`;

  return buildPageMetadata({
    pageTitle:
      `${servicesPageData.titleMain} ${servicesPageData.titleAccent}`.trim() ||
      'Canadian Immigration Services',
    pageDescription: servicesPageData.description,
    seo: servicesPageData.seo,
    settings,
    canonicalPath,
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang = defaultLanguage } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;

  const [settings, services, servicesPageData] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchServices(currentLang),
    fetchServicesPage(currentLang),
  ]);

  const canonicalPath = currentLang === defaultLanguage ? '/services' : `/${currentLang}/services`;

  const serviceJsonLd = buildPageJsonLd({
    title:
      `${servicesPageData?.titleMain} ${servicesPageData?.titleAccent}`.trim() ||
      'Canadian Immigration Services',
    description: servicesPageData?.description,
    url: canonicalPath,
    defaultType: 'Service',
    structuredDataType: servicesPageData?.seo?.structuredDataType,
    settings,
    services,
  });

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <main>
        <PageHeader
          eyebrow={servicesPageData?.eyebrow || 'HOW WE CAN HELP'}
          title={servicesPageData?.titleMain || 'A pathway built'}
          accent={servicesPageData?.titleAccent || 'around you.'}
          copy={
            servicesPageData?.description ||
            'Personalized Canadian immigration guidance for the next chapter you are ready to build.'
          }
        />
        <Suspense
          fallback={<div className="text-text-muted py-20 text-center">Loading pathways...</div>}
        >
          <TabbedServices services={services} settings={settings} />
        </Suspense>
        <ServicesCallout settings={settings} />
      </main>
    </>
  );
}
