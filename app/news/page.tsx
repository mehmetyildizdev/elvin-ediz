import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { NewsList } from '@/components/pages/news/list';
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
    pageTitle: `${insightsPageData.newsTitle || 'Canadian Immigration News & Media Updates'}`,
    pageDescription: 'Curated Canadian immigration news, policy analysis, Express Entry draw results, and economic migration trends.',
    settings,
    canonicalPath: '/news',
  });
}

export default async function NewsPage() {
  const settings = await fetchSiteSettings();
  const insightsPageData = await fetchInsightsPage();
  const posts = await fetchPosts();

  const newsJsonLd = buildWebPageJsonLd({
    title: insightsPageData.newsTitle || 'Canadian Immigration News',
    description: 'Curated Canadian immigration news, policy updates, and economic migration trends.',
    url: '/news',
    type: 'CollectionPage',
    settings,
  });

  return (
    <>
      <JsonLd data={newsJsonLd} />
      <Header settings={settings} />
      <main>
        <NewsList insightsPageData={insightsPageData} posts={posts} settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}

