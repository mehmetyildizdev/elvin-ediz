import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHeader } from '@/components/ui/page-header';
import { InsightsGrid } from '@/components/pages/insights/grid';
import { fetchSiteSettings } from '@/sanity/lib/data';

export default async function InformationPage() {
  const settings = await fetchSiteSettings();

  return (
    <>
      <Header settings={settings} />
      <main>
        <PageHeader
          eyebrow="IMMIGRATION EXPLAINED"
          title="Useful"
          accent="information."
          copy="Practical, approachable updates from Elvin Ediz Immigration Services."
        />
        <InsightsGrid kind="information" />
      </main>
      <Footer />
    </>
  );
}
