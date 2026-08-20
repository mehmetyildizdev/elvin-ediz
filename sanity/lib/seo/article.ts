import type { PostData, SiteSettingsData } from '../types';
import { BASE_URL, stripStega, toPlainText } from './utils';

/**
 * Builds Schema.org Article or NewsArticle schema
 * Applicable for: "Article" & "NewsArticle"
 */
export function buildArticleJsonLd(
  post: PostData,
  settings?: SiteSettingsData,
  forceNews?: boolean
) {
  const structuredType = stripStega(post.seo?.structuredDataType) || 'auto';
  const postKind = stripStega(post.kind);
  const isNews =
    forceNews ??
    (structuredType === 'NewsArticle' || (structuredType === 'auto' && postKind === 'news'));
  const type = isNews ? 'NewsArticle' : 'Article';

  const cleanSlug = stripStega(post.slug);
  const postUrl = `${BASE_URL}/insights/${cleanSlug}`;
  const authorName = stripStega(post.authorName) || 'Nazly Sunguroglu, RCIC';
  const authorRole = stripStega(post.authorRole) || 'Regulated Canadian Immigration Consultant';

  return {
    '@context': 'https://schema.org',
    '@type': type,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    headline: stripStega(post.title),
    description: stripStega(toPlainText(post.excerpt || post.title)),
    image: post.coverImageUrl ? [stripStega(post.coverImageUrl)] : undefined,
    datePublished: stripStega(post.publishedAt) || new Date().toISOString(),
    dateModified: stripStega(post.publishedAt) || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole,
      url: `${BASE_URL}/#about`,
    },
    publisher: {
      '@type': 'Organization',
      name: stripStega(settings?.siteTitle) || 'Elvin Ediz Immigration Services',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.png`,
      },
    },
    articleSection: stripStega(post.category) || 'Canadian Immigration',
    inLanguage: 'en-CA',
    ...(isNews && post.sourceName
      ? {
          sourceOrganization: {
            '@type': 'NewsMediaOrganization',
            name: stripStega(post.sourceName),
            url: stripStega(post.sourceURL) || undefined,
          },
        }
      : {}),
  };
}
