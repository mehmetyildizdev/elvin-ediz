import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHeader } from '@/components/ui/page-header';
import { ServicesGrid } from '@/components/pages/services/grid';
import { ServicesCallout } from '@/components/pages/services/callout';
import { fetchSiteSettings, fetchServices } from '@/sanity/lib/data';

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
        <ServicesGrid services={services} />
        <ServicesCallout />
      </main>
      <Footer />
    </>
  );
}
