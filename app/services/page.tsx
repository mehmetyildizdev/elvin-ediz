import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHeader } from '@/components/ui/page-header';
import { TabbedServices } from '@/components/pages/services/tabbed-services';
import { ServicesCallout } from '@/components/pages/services/callout';
import { fetchSiteSettings, fetchServices } from '@/sanity/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ServicesPage() {
  const settings = await fetchSiteSettings();
  const services = await fetchServices();

  return (
    <>
      <Header settings={settings} />
      <main>
        <PageHeader
          eyebrow="HOW WE CAN HELP"
          title="A pathway built"
          accent="around you."
          copy="Personalized Canadian immigration guidance for the next chapter you are ready to build."
        />
        <Suspense fallback={<div className="py-20 text-center text-text-muted">Loading pathways...</div>}>
          <TabbedServices services={services} />
        </Suspense>
        <ServicesCallout />
      </main>
      <Footer />
    </>
  );
}
