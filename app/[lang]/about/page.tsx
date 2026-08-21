import type { Metadata } from 'next';
import {
  fetchSiteSettings,
  fetchAboutPage,
  fetchStaff,
} from '@/sanity/lib/data';
import { buildPageMetadata, buildPageJsonLd } from '@/sanity/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { defaultLanguage, isValidLanguage } from '@/sanity/i18n';
import { PageHeader } from '@/components/ui/page-header';
import { AboutWhoAreWe } from '@/components/pages/about/who-are-we';
import { AboutStrategy } from '@/components/pages/about/strategy';
import { AboutProcess } from '@/components/pages/about/process';
import { AboutCallout } from '@/components/pages/about/callout';

export const revalidate = 1209600; // 2 weeks

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang = defaultLanguage } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;
  const [settings, aboutData] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchAboutPage(currentLang),
  ]);

  const canonicalPath =
    currentLang === defaultLanguage ? '/about' : `/${currentLang}/about`;

  return buildPageMetadata({
    pageTitle:
      aboutData.titleMain && aboutData.titleAccent
        ? `${aboutData.titleMain} ${aboutData.titleAccent}`
        : 'About Us',
    pageDescription: aboutData.description || aboutData.whoAreWeParagraph1,
    pageCoverImageUrl: aboutData.strategyImageUrl || aboutData.ciccBadgeImageUrl,
    seo: aboutData.seo,
    settings,
    canonicalPath,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang = defaultLanguage } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;

  const [settings, aboutData, staff] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchAboutPage(currentLang),
    fetchStaff(currentLang),
  ]);

  const canonicalPath =
    currentLang === defaultLanguage ? '/about' : `/${currentLang}/about`;

  const aboutJsonLd = buildPageJsonLd({
    title:
      aboutData.titleMain && aboutData.titleAccent
        ? `${aboutData.titleMain} ${aboutData.titleAccent}`
        : 'About Us | Elvin Ediz Immigration Services',
    description: aboutData.description || aboutData.whoAreWeParagraph1,
    url: canonicalPath,
    defaultType: 'AboutPage',
    structuredDataType: aboutData.seo?.structuredDataType,
    settings,
  });

  return (
    <main>
      <JsonLd data={aboutJsonLd} />
      <PageHeader
        eyebrow={aboutData.eyebrow}
        title={aboutData.titleMain}
        accent={aboutData.titleAccent}
        copy={aboutData.description}
      />
      <AboutWhoAreWe aboutData={aboutData} settings={settings} />
      <AboutStrategy aboutData={aboutData} staff={staff} settings={settings} />
      <AboutProcess aboutData={aboutData} />
      <AboutCallout aboutData={aboutData} settings={settings} />
    </main>
  );
}
