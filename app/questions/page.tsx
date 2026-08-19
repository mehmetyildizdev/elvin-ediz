import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHeader } from '@/components/ui/page-header';
import { QuestionsList } from '@/components/pages/questions/list';
import { fetchSiteSettings, fetchFaqPage } from '@/sanity/lib/data';

export const revalidate = 1209600; // 2 weeks

export default async function QuestionsPage() {
  const settings = await fetchSiteSettings();
  const faqPageData = await fetchFaqPage();

  return (
    <>
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
