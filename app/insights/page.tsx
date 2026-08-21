import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { InsightsHub } from '@/components/pages/insights/hub';
import { fetchSiteSettings, fetchInsightsPage, fetchPosts } from '@/sanity/lib/data';
import { buildPageMetadata, buildPageJsonLd } from '@/sanity/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const revalidate = 1209600; // 2 weeks

export async function generateMetadata(): Promise<Metadata> {
  const [settings, insightsPageData] = await Promise.all([
    fetchSiteSettings(),
    fetchInsightsPage(),
  ]);

  return buildPageMetadata({
    pageTitle:
      `${insightsPageData.titleMain} ${insightsPageData.titleAccent}`.trim() ||
      'Insights & Immigration Updates',
    pageDescription: insightsPageData.description,
    seo: insightsPageData.seo,
    settings,
    canonicalPath: '/insights',
  });
}

export default async function InsightsPage() {
  const settings = await fetchSiteSettings();
  const insightsPageData = await fetchInsightsPage();
  const posts = await fetchPosts();

  const hubJsonLd = buildPageJsonLd({
    title:
      `${insightsPageData.titleMain} ${insightsPageData.titleAccent}`.trim() ||
      'Insights & Updates',
    description: insightsPageData.description,
    url: '/insights',
    defaultType: 'CollectionPage',
    structuredDataType: insightsPageData.seo?.structuredDataType,
    settings,
  });

  return (
    <>
      <JsonLd data={hubJsonLd} />
      <Header settings={settings} />
      <main>
        <InsightsHub insightsPageData={insightsPageData} posts={posts} settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
