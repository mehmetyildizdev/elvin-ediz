import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHeader } from '@/components/ui/page-header';
import { TabbedServices } from '@/components/pages/services/tabbed-services';
import { ServicesCallout } from '@/components/pages/services/callout';
import { fetchSiteSettings, fetchServices, fetchServicesPage } from '@/sanity/lib/data';
import { buildPageMetadata, buildPageJsonLd } from '@/sanity/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const revalidate = 1209600; // 2 weeks

export async function generateMetadata(): Promise<Metadata> {
  const [settings, servicesPageData] = await Promise.all([
    fetchSiteSettings(),
    fetchServicesPage(),
  ]);

  return buildPageMetadata({
    pageTitle: `${servicesPageData.titleMain} ${servicesPageData.titleAccent}`.trim() || 'Canadian Immigration Services',
    pageDescription: servicesPageData.description,
    seo: servicesPageData.seo,
    settings,
    canonicalPath: '/services',
  });
}

export default async function ServicesPage() {
  const [settings, services, servicesPageData] = await Promise.all([
    fetchSiteSettings(),
    fetchServices(),
    fetchServicesPage(),
  ]);

  const serviceJsonLd = buildPageJsonLd({
    title: `${servicesPageData?.titleMain} ${servicesPageData?.titleAccent}`.trim() || 'Canadian Immigration Services',
    description: servicesPageData?.description,
    url: '/services',
    defaultType: 'Service',
    structuredDataType: servicesPageData?.seo?.structuredDataType,
    settings,
    services,
  });

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <Header settings={settings} />
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
        <Suspense fallback={<div className="py-20 text-center text-text-muted">Loading pathways...</div>}>
          <TabbedServices services={services} settings={settings} />
        </Suspense>
        <ServicesCallout settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
