import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { NewsList } from '@/components/pages/news/list';
import { fetchSiteSettings, fetchInsightsPage, fetchPosts } from '@/sanity/lib/data';

export const revalidate = 1209600; // 2 weeks

export default async function NewsPage() {
  const settings = await fetchSiteSettings();
  const insightsPageData = await fetchInsightsPage();
  const posts = await fetchPosts();

  return (
    <>
      <Header settings={settings} />
      <main>
        <NewsList insightsPageData={insightsPageData} posts={posts} settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}

