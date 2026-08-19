import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AnnouncementsList } from '@/components/pages/announcements/list';
import { fetchSiteSettings, fetchInsightsPage, fetchPosts } from '@/sanity/lib/data';

export const revalidate = 1209600; // 2 weeks

export default async function AnnouncementsPage() {
  const settings = await fetchSiteSettings();
  const insightsPageData = await fetchInsightsPage();
  const posts = await fetchPosts();

  return (
    <>
      <Header settings={settings} />
      <main>
        <AnnouncementsList insightsPageData={insightsPageData} posts={posts} settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}

