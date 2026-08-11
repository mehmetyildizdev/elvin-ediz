import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHeader } from '@/components/ui/page-header';
import { InsightsGrid } from '@/components/pages/insights/grid';
import { fetchSiteSettings } from '@/sanity/lib/data';

export default async function NewsPage() {
  const settings = await fetchSiteSettings();

  return (
    <>
      <Header settings={settings} />
      <main>
        <PageHeader
          eyebrow="IMMIGRATION NEWS"
          title="What is happening"
          accent="in Canada."
          copy="Practical, approachable updates from Elvin Ediz Immigration Services."
        />
        <InsightsGrid kind="news" />
      </main>
      <Footer />
    </>
  );
}
