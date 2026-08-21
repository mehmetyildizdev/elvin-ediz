import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { InsightsDetail } from '@/components/pages/insights/detail';
import { fetchSiteSettings, fetchPostBySlug, fetchAllPostSlugsWithLang } from '@/sanity/lib/data';
import { buildPageMetadata, buildPostJsonLd } from '@/sanity/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { defaultLanguage, isValidLanguage } from '@/sanity/i18n';

export const revalidate = 1209600; // 2 weeks

// Only pre-generate static pages for documents that actually exist in Sanity
export async function generateStaticParams() {
  return await fetchAllPostSlugsWithLang('information');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang = defaultLanguage, slug } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;
  const decodedSlug = decodeURIComponent(slug);
  const [settings, post] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchPostBySlug(decodedSlug, currentLang, true),
  ]);

  if (!post) {
    return buildPageMetadata({
      pageTitle: 'Information Guide',
      settings,
    });
  }

  const canonicalPath =
    currentLang === defaultLanguage
      ? `/information/${post.slug}`
      : `/${currentLang}/information/${post.slug}`;

  return buildPageMetadata({
    pageTitle: post.title,
    pageDescription: post.excerpt,
    pageCoverImageUrl: post.coverImageUrl,
    seo: post.seo,
    settings,
    canonicalPath,
    keywords: post.category ? [post.category] : [],
    type: 'article',
    publishedTime: post.publishedAt,
    authors: post.authorName ? [post.authorName] : undefined,
  });
}

export default async function InformationSlugPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang = defaultLanguage, slug } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;
  const decodedSlug = decodeURIComponent(slug);
  const [settings, post] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchPostBySlug(decodedSlug, currentLang, true),
  ]);

  // If the post exists but has a different localized slug in this language, redirect to its true URL
  if (post && post.slug !== decodedSlug && currentLang !== defaultLanguage) {
    redirect(`/${currentLang}/information/${post.slug}`);
  }

  // If this post is not translated in the requested language, redirect to English version
  if (!post && currentLang !== defaultLanguage) {
    redirect(`/information/${decodedSlug}`);
  }

  const postJsonLd = post ? buildPostJsonLd(post, settings) : null;

  return (
    <>
      <JsonLd data={postJsonLd} />
      <main>
        <InsightsDetail post={post} slug={decodedSlug} settings={settings} lang={currentLang} />
      </main>
    </>
  );
}
