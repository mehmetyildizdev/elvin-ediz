import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AnnouncementsList } from '@/components/pages/announcements/list';
import { fetchSiteSettings, fetchInsightsPage, fetchPosts } from '@/sanity/lib/data';
import { buildPageMetadata, buildWebPageJsonLd } from '@/sanity/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const revalidate = 1209600; // 2 weeks

export async function generateMetadata(): Promise<Metadata> {
  const [settings, insightsPageData] = await Promise.all([
    fetchSiteSettings(),
    fetchInsightsPage(),
  ]);

  return buildPageMetadata({
    pageTitle: `${insightsPageData.announcementsTitle || 'Official Immigration Announcements & Bulletins'}`,
    pageDescription:
      'Official policy changes, processing updates, and immigration regulatory notices from IRCC and Elvin Ediz Immigration Services.',
    settings,
    canonicalPath: '/announcements',
  });
}

export default async function AnnouncementsPage() {
  const settings = await fetchSiteSettings();
  const insightsPageData = await fetchInsightsPage();
  const posts = await fetchPosts();

  const announcementsJsonLd = buildWebPageJsonLd({
    title: insightsPageData.announcementsTitle || 'Official Immigration Announcements',
    description: 'Official policy changes, processing updates, and immigration regulatory notices.',
    url: '/announcements',
    type: 'CollectionPage',
    settings,
  });

  return (
    <>
      <JsonLd data={announcementsJsonLd} />
      <Header settings={settings} />
      <main>
        <AnnouncementsList insightsPageData={insightsPageData} posts={posts} settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
