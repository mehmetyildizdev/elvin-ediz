import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { InsightsDetail } from '@/components/pages/insights/detail';
import { fetchSiteSettings, fetchPostBySlug, fetchPosts } from '@/sanity/lib/data';
import { buildPageMetadata, buildPostJsonLd } from '@/sanity/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const revalidate = 1209600; // 2 weeks

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.filter((p) => Boolean(p.slug)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const [settings, post] = await Promise.all([
    fetchSiteSettings(),
    fetchPostBySlug(decodedSlug),
  ]);

  if (!post) {
    return buildPageMetadata({
      pageTitle: 'Guide Not Found',
      settings,
    });
  }

  return buildPageMetadata({
    pageTitle: post.title,
    pageDescription: post.excerpt,
    pageCoverImageUrl: post.coverImageUrl,
    seo: post.seo,
    settings,
    canonicalPath: `/information/${post.slug}`,
    keywords: post.category ? [post.category] : [],
    type: 'article',
    publishedTime: post.publishedAt,
    authors: post.authorName ? [post.authorName] : undefined,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const [settings, post] = await Promise.all([
    fetchSiteSettings(),
    fetchPostBySlug(decodedSlug),
  ]);

  const postJsonLd = post ? buildPostJsonLd(post, settings) : null;

  return (
    <>
      <JsonLd data={postJsonLd} />
      <Header settings={settings} />
      <main>
        <InsightsDetail post={post} slug={decodedSlug} settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
