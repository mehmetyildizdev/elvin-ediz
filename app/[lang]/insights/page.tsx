import type { Metadata } from 'next';
import { InsightsHub } from '@/components/pages/insights/hub';
import { fetchSiteSettings, fetchInsightsPage, fetchPosts } from '@/sanity/lib/data';
import { buildPageMetadata, buildPageJsonLd } from '@/sanity/lib/seo';
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

  const canonicalPath = currentLang === defaultLanguage ? '/insights' : `/${currentLang}/insights`;

  return buildPageMetadata({
    pageTitle:
      `${insightsPageData.titleMain} ${insightsPageData.titleAccent}`.trim() ||
      'Insights & Immigration Updates',
    pageDescription: insightsPageData.description,
    seo: insightsPageData.seo,
    settings,
    canonicalPath,
  });
}

export default async function InsightsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang = defaultLanguage } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;

  const [settings, insightsPageData, posts] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchInsightsPage(currentLang),
    fetchPosts(undefined, currentLang),
  ]);

  const canonicalPath = currentLang === defaultLanguage ? '/insights' : `/${currentLang}/insights`;

  const hubJsonLd = buildPageJsonLd({
    title:
      `${insightsPageData.titleMain} ${insightsPageData.titleAccent}`.trim() ||
      'Insights & Updates',
    description: insightsPageData.description,
    url: canonicalPath,
    defaultType: 'CollectionPage',
    structuredDataType: insightsPageData.seo?.structuredDataType,
    settings,
  });

  return (
    <>
      <JsonLd data={hubJsonLd} />
      <main>
        <InsightsHub
          insightsPageData={insightsPageData}
          posts={posts}
          settings={settings}
          lang={currentLang}
        />
      </main>
    </>
  );
}
