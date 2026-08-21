import type { Metadata } from 'next';
import { NewsList } from '@/components/pages/news/list';
import { fetchSiteSettings, fetchInsightsPage, fetchPosts } from '@/sanity/lib/data';
import { buildPageMetadata, buildWebPageJsonLd } from '@/sanity/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { defaultLanguage, isValidLanguage } from '@/sanity/i18n';

export const revalidate = 1209600; // 2 weeks

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang = defaultLanguage } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;
  const [settings, insightsPageData] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchInsightsPage(currentLang),
  ]);

  const canonicalPath = currentLang === defaultLanguage ? '/news' : `/${currentLang}/news`;

  return buildPageMetadata({
    pageTitle: `${insightsPageData.newsTitle || 'Canadian Immigration News & Media Updates'}`,
    pageDescription:
      'Curated Canadian immigration news, policy analysis, Express Entry draw results, and economic migration trends.',
    settings,
    canonicalPath,
  });
}

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang = defaultLanguage } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;

  const [settings, insightsPageData, posts] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchInsightsPage(currentLang),
    fetchPosts(undefined, currentLang),
  ]);

  const canonicalPath = currentLang === defaultLanguage ? '/news' : `/${currentLang}/news`;

  const newsJsonLd = buildWebPageJsonLd({
    title: insightsPageData.newsTitle || 'Canadian Immigration News',
    description:
      'Curated Canadian immigration news, policy updates, and economic migration trends.',
    url: canonicalPath,
    type: 'CollectionPage',
    settings,
  });

  return (
    <>
      <JsonLd data={newsJsonLd} />
      <main>
        <NewsList
          insightsPageData={insightsPageData}
          posts={posts}
          settings={settings}
          lang={currentLang}
        />
      </main>
    </>
  );
}
