import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ServiceDetail } from '@/components/pages/services/detail';
import { fetchSiteSettings, fetchServiceBySlug } from '@/sanity/lib/data';

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const settings = await fetchSiteSettings();
  const service = await fetchServiceBySlug(resolvedParams.slug);

  return (
    <main>
      <Header settings={settings} />
      <ServiceDetail service={service} slug={resolvedParams.slug} />
      <Footer />
    </main>
  );
}
