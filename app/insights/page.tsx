import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { InsightsHub } from '@/components/pages/insights/hub';
import { fetchSiteSettings, fetchInsightsPage, fetchPosts } from '@/sanity/lib/data';

export const revalidate = 1209600; // 2 weeks

export default async function InsightsPage() {
  const settings = await fetchSiteSettings();
  const insightsPageData = await fetchInsightsPage();
  const posts = await fetchPosts();

  return (
    <>
      <Header settings={settings} />
      <main>
        <InsightsHub insightsPageData={insightsPageData} posts={posts} settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}

