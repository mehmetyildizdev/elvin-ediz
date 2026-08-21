import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/page-header';
import { QuestionsList } from '@/components/pages/questions/list';
import { fetchSiteSettings, fetchFaqPage } from '@/sanity/lib/data';
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
  const [settings, faqPageData] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchFaqPage(currentLang),
  ]);

  const canonicalPath =
    currentLang === defaultLanguage ? '/questions' : `/${currentLang}/questions`;

  return buildPageMetadata({
    pageTitle:
      `${faqPageData.titleMain || 'Frequently Asked Questions'} ${faqPageData.titleAccent || '& Immigration Q&A'}`.trim(),
    pageDescription:
      faqPageData.description ||
      'Common questions and answers regarding Canadian immigration visas, Express Entry, study permits, and work permits.',
    seo: faqPageData.seo,
    settings,
    canonicalPath,
  });
}

export default async function QuestionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang = defaultLanguage } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;

  const [settings, faqPageData] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchFaqPage(currentLang),
  ]);

  const canonicalPath =
    currentLang === defaultLanguage ? '/questions' : `/${currentLang}/questions`;

  const faqJsonLd = buildPageJsonLd({
    title:
      `${faqPageData.titleMain || 'Frequently Asked Questions'} ${faqPageData.titleAccent || '& Immigration Q&A'}`.trim(),
    description: faqPageData.description,
    url: canonicalPath,
    defaultType: 'FAQPage',
    structuredDataType: faqPageData.seo?.structuredDataType,
    settings,
    faqPageData,
  });

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <main>
        <PageHeader
          eyebrow={faqPageData.eyebrow}
          title={faqPageData.titleMain}
          accent={faqPageData.titleAccent}
          copy={faqPageData.description}
        />
        <QuestionsList faqPageData={faqPageData} settings={settings} />
      </main>
    </>
  );
}
