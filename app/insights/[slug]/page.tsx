import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { InsightsDetail } from '@/components/pages/insights/detail';
import { fetchSiteSettings } from '@/sanity/lib/data';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const settings = await fetchSiteSettings();

  return (
    <>
      <Header settings={settings} />
      <main>
        <InsightsDetail slug={slug} />
      </main>
      <Footer />
    </>
  );
}
