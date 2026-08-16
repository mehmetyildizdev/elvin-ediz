import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { InsightsHub } from '@/components/pages/insights/hub';
import { fetchSiteSettings, fetchInsightsPage, fetchPosts } from '@/sanity/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InformationPage() {
  const settings = await fetchSiteSettings();
  const insightsPageData = await fetchInsightsPage();
  const posts = await fetchPosts();

  return (
    <>
      <Header settings={settings} />
      <main>
        <InsightsHub insightsPageData={insightsPageData} posts={posts} />
      </main>
      <Footer />
    </>
  );
}

