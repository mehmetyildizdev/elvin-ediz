import type { Metadata } from 'next';
import { AnnouncementsList } from '@/components/pages/announcements/list';
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

  const canonicalPath =
    currentLang === defaultLanguage ? '/announcements' : `/${currentLang}/announcements`;

  return buildPageMetadata({
    pageTitle: `${insightsPageData.announcementsTitle || 'Official Immigration Announcements & Regulatory Bulletins'}`,
    pageDescription:
      'Official IRCC regulatory updates, ministerial instructions, compliance standards, and procedural changes.',
    settings,
    canonicalPath,
  });
}

export default async function AnnouncementsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang = defaultLanguage } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;

  const [settings, insightsPageData, posts] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchInsightsPage(currentLang),
    fetchPosts(undefined, currentLang),
  ]);

  const canonicalPath =
    currentLang === defaultLanguage ? '/announcements' : `/${currentLang}/announcements`;

  const announcementsJsonLd = buildWebPageJsonLd({
    title: insightsPageData.announcementsTitle || 'Official Immigration Announcements',
    description:
      'Official IRCC regulatory updates, ministerial instructions, compliance standards, and procedural changes.',
    url: canonicalPath,
    type: 'CollectionPage',
    settings,
  });

  return (
    <>
      <JsonLd data={announcementsJsonLd} />
      <main>
        <AnnouncementsList
          insightsPageData={insightsPageData}
          posts={posts}
          settings={settings}
          lang={currentLang}
        />
      </main>
    </>
  );
}
