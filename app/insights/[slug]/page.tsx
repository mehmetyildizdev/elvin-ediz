import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { InsightsDetail } from '@/components/pages/insights/detail';
import { fetchSiteSettings, fetchPostBySlug, fetchPosts } from '@/sanity/lib/data';

export const revalidate = 1209600; // 2 weeks

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.filter((p) => Boolean(p.slug)).map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, post] = await Promise.all([fetchSiteSettings(), fetchPostBySlug(slug)]);

  return (
    <>
      <Header settings={settings} />
      <main>
        <InsightsDetail post={post} slug={slug} settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}

