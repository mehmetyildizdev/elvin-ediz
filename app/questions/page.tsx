import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHeader } from '@/components/ui/page-header';
import { QuestionsList } from '@/components/pages/questions/list';
import { fetchSiteSettings, fetchFaqPage } from '@/sanity/lib/data';
import { buildPageMetadata, buildPageJsonLd } from '@/sanity/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const revalidate = 1209600; // 2 weeks

export async function generateMetadata(): Promise<Metadata> {
  const [settings, faqPageData] = await Promise.all([fetchSiteSettings(), fetchFaqPage()]);

  return buildPageMetadata({
    pageTitle:
      `${faqPageData.titleMain || 'Frequently Asked Questions'} ${faqPageData.titleAccent || '& Immigration Q&A'}`.trim(),
    pageDescription:
      faqPageData.description ||
      'Common questions and answers regarding Canadian immigration visas, Express Entry, study permits, and work permits.',
    seo: faqPageData.seo,
    settings,
    canonicalPath: '/questions',
  });
}

export default async function QuestionsPage() {
  const settings = await fetchSiteSettings();
  const faqPageData = await fetchFaqPage();

  const faqJsonLd = buildPageJsonLd({
    title:
      `${faqPageData.titleMain || 'Frequently Asked Questions'} ${faqPageData.titleAccent || '& Immigration Q&A'}`.trim(),
    description: faqPageData.description,
    url: '/questions',
    defaultType: 'FAQPage',
    structuredDataType: faqPageData.seo?.structuredDataType,
    settings,
    faqPageData,
  });

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Header settings={settings} />
      <main>
        <PageHeader
          eyebrow={faqPageData.eyebrow}
          title={faqPageData.titleMain}
          accent={faqPageData.titleAccent}
          copy={faqPageData.description}
        />
        <QuestionsList faqPageData={faqPageData} settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
