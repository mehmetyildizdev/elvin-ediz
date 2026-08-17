import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageHeader } from '@/components/ui/page-header';
import { QuestionsList } from '@/components/pages/questions/list';
import { fetchSiteSettings } from '@/sanity/lib/data';

export default async function QuestionsPage() {
  const settings = await fetchSiteSettings();

  return (
    <>
      <Header settings={settings} />
      <main>
        <PageHeader
          eyebrow="COMMON QUESTIONS"
          title="Clear answers for"
          accent="the road ahead."
          copy="Every immigration path is different. These answers offer a helpful place to begin."
        />
        <QuestionsList />
      </main>
      <Footer settings={settings} />
    </>
  );
}
