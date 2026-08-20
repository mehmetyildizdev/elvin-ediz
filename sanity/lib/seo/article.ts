import type { PostData, SiteSettingsData } from '../types';
import { BASE_URL } from './utils';

/**
 * Builds Schema.org Article or NewsArticle schema
 * Applicable for: "Article" & "NewsArticle"
 */
export function buildArticleJsonLd(
  post: PostData,
  settings?: SiteSettingsData,
  forceNews?: boolean
) {
  const structuredType = post.seo?.structuredDataType || 'auto';
  const isNews =
    forceNews ??
    (structuredType === 'NewsArticle' || (structuredType === 'auto' && post.kind === 'news'));
  const type = isNews ? 'NewsArticle' : 'Article';

  const postUrl = `${BASE_URL}/insights/${post.slug}`;
  const authorName = post.authorName || 'Nazly Sunguroglu, RCIC';
  const authorRole = post.authorRole || 'Regulated Canadian Immigration Consultant';

  return {
    '@context': 'https://schema.org',
    '@type': type,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    datePublished: post.publishedAt || new Date().toISOString(),
    dateModified: post.publishedAt || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole,
      url: `${BASE_URL}/#about`,
    },
    publisher: {
      '@type': 'Organization',
      name: settings?.siteTitle || 'Elvin Ediz Immigration Services',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.png`,
      },
    },
    articleSection: post.category || 'Canadian Immigration',
    inLanguage: 'en-CA',
    ...(isNews && post.sourceName
      ? {
          sourceOrganization: {
            '@type': 'NewsMediaOrganization',
            name: post.sourceName,
            url: post.sourceURL || undefined,
          },
        }
      : {}),
  };
}
