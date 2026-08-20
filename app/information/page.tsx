import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { InformationList } from '@/components/pages/information/list';
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
    pageTitle: `${insightsPageData.infoTitleMain || 'Practical Immigration Guides'} ${insightsPageData.infoTitleAccent || '& Checklists'}`.trim(),
    pageDescription: insightsPageData.infoDescription || 'Step-by-step Canadian immigration guides, document checklists, and application preparation resources.',
    settings,
    canonicalPath: '/information',
  });
}

export default async function InformationPage() {
  const settings = await fetchSiteSettings();
  const insightsPageData = await fetchInsightsPage();
  const posts = await fetchPosts();

  const informationJsonLd = buildWebPageJsonLd({
    title: `${insightsPageData.infoTitleMain || 'Practical Immigration Guides'} ${insightsPageData.infoTitleAccent || '& Checklists'}`.trim(),
    description: insightsPageData.infoDescription || 'Step-by-step Canadian immigration guides, document checklists, and application preparation resources.',
    url: '/information',
    type: 'CollectionPage',
    settings,
  });

  return (
    <>
      <JsonLd data={informationJsonLd} />
      <Header settings={settings} />
      <main>
        <InformationList insightsPageData={insightsPageData} posts={posts} settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}

