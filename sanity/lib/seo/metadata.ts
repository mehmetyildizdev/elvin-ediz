import type { Metadata } from 'next';
import type { SeoData, SiteSettingsData } from '../types';
import { BASE_URL } from './utils';

export interface PageMetadataOptions {
  pageTitle?: string;
  pageDescription?: string;
  pageCoverImageUrl?: string;
  seo?: SeoData;
  settings?: SiteSettingsData;
  canonicalPath?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
  authors?: string[];
}

/**
 * Builds standard, production-ready Next.js Metadata with multi-tier fallback logic:
 * 1. Specific SEO field on document (seo.metaTitle, seo.metaDescription, seo.ogImageUrl)
 * 2. Document content properties (title, excerpt/summary, coverImageUrl)
 * 3. Site Settings global defaults (defaultMetaTitle, defaultMetaDescription, defaultOgImageUrl)
 */
export function buildPageMetadata(options: PageMetadataOptions): Metadata {
  const {
    pageTitle,
    pageDescription,
    pageCoverImageUrl,
    seo,
    settings,
    canonicalPath,
    keywords = [],
    type = 'website',
    publishedTime,
    authors,
  } = options;

  const siteTitle = settings?.siteTitle || 'Elvin Ediz Immigration Services';

  // 01. Title Resolution
  const rawTitle = seo?.metaTitle?.trim() || pageTitle?.trim() || settings?.defaultMetaTitle || siteTitle;
  const resolvedTitle =
    rawTitle.includes('|') || rawTitle === siteTitle
      ? rawTitle
      : `${rawTitle} | ${siteTitle}`;

  // 02. Description Resolution
  const resolvedDescription =
    seo?.metaDescription?.trim() ||
    pageDescription?.trim() ||
    settings?.defaultMetaDescription ||
    'Personalized Canadian immigration guidance and representation from Nazly Sunguroglu, RCIC in Toronto, Ontario.';

  // 03. Social Share Image Resolution
  const resolvedOgImage =
    seo?.ogImageUrl ||
    pageCoverImageUrl ||
    settings?.defaultOgImageUrl ||
    '/favicon.png';

  // 04. Social Title & Description (with platform-specific overrides if provided)
  const ogTitle = seo?.ogTitle?.trim() || resolvedTitle;
  const ogDescription = seo?.ogDescription?.trim() || resolvedDescription;

  // 05. Keywords
  const mergedKeywords = Array.from(
    new Set([
      ...(seo?.keywords || []),
      ...keywords,
      ...(settings?.siteKeywords || []),
    ])
  );

  // 06. Canonical URL
  const canonicalUrl =
    seo?.canonicalUrl?.trim() ||
    (canonicalPath ? `${BASE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}` : undefined);

  // 07. Search Engine Directives
  const isNoIndex = Boolean(seo?.noIndex);
  const isNoFollow = Boolean(seo?.noFollow);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: mergedKeywords.length > 0 ? mergedKeywords : undefined,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl || BASE_URL,
      siteName: siteTitle,
      locale: 'en_CA',
      type: type,
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(type === 'article' && authors?.length ? { authors } : {}),
      images: resolvedOgImage
        ? [
            {
              url: resolvedOgImage,
              width: 1200,
              height: 630,
              alt: seo?.metaTitle || resolvedTitle,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: resolvedOgImage ? [resolvedOgImage] : [],
    },
    robots: {
      index: !isNoIndex,
      follow: !isNoFollow,
      googleBot: {
        index: !isNoIndex,
        follow: !isNoFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: settings?.googleSiteVerification
      ? { google: settings.googleSiteVerification }
      : undefined,
  };
}
