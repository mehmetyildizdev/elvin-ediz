import type { Metadata } from 'next';
import { InformationList } from '@/components/pages/information/list';
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

  const pageTitle =
    `${insightsPageData.infoTitleMain || 'Immigration Guides'} ${insightsPageData.infoTitleAccent || '& Blueprints'}`.trim();
  const canonicalPath =
    currentLang === defaultLanguage ? '/information' : `/${currentLang}/information`;

  return buildPageMetadata({
    pageTitle: `${pageTitle} | Official Immigration Guides`,
    pageDescription:
      insightsPageData.infoDescription ||
      'Step-by-step Canadian immigration roadmaps, document preparation blueprints, and compliance checklists.',
    settings,
    canonicalPath,
  });
}

export default async function InformationPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang = defaultLanguage } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;

  const [settings, insightsPageData, posts] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchInsightsPage(currentLang),
    fetchPosts(undefined, currentLang),
  ]);

  const pageTitle =
    `${insightsPageData.infoTitleMain || 'Immigration Guides'} ${insightsPageData.infoTitleAccent || '& Blueprints'}`.trim();
  const canonicalPath =
    currentLang === defaultLanguage ? '/information' : `/${currentLang}/information`;

  const infoJsonLd = buildWebPageJsonLd({
    title: pageTitle,
    description:
      insightsPageData.infoDescription ||
      'Step-by-step Canadian immigration roadmaps, document blueprints, and compliance checklists.',
    url: canonicalPath,
    type: 'CollectionPage',
    settings,
  });

  return (
    <>
      <JsonLd data={infoJsonLd} />
      <main>
        <InformationList
          insightsPageData={insightsPageData}
          posts={posts}
          settings={settings}
          lang={currentLang}
        />
      </main>
    </>
  );
}
