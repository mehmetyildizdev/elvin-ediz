import type { Metadata } from 'next';
import type { SeoData, SiteSettingsData } from '../types';
import { BASE_URL, stripStega } from './utils';

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

  const siteTitle = stripStega(settings?.siteTitle) || 'Elvin Ediz Immigration Services';

  // 01. Title Resolution
  // Next.js layout uses `title.template: '%s | Elvin Ediz Immigration Services'`.
  // Returning rawTitle lets Next.js format the title once with no duplicates.
  // If the title already contains '|' or matches siteTitle, we use { absolute: rawTitle }.
  const rawTitle =
    stripStega(seo?.metaTitle || pageTitle || settings?.defaultMetaTitle) || siteTitle;
  const isCustomOrFullTitle = rawTitle.includes('|') || rawTitle === siteTitle;
  const resolvedTitle = isCustomOrFullTitle ? { absolute: rawTitle } : rawTitle;

  // 02. Description Resolution
  const resolvedDescription =
    stripStega(seo?.metaDescription) ||
    stripStega(pageDescription) ||
    stripStega(settings?.defaultMetaDescription) ||
    'Personalized Canadian immigration guidance and representation from Nazly Sunguroglu, RCIC in Toronto, Ontario.';

  // 03. Social Share Image Resolution
  const resolvedOgImage =
    stripStega(seo?.ogImageUrl) ||
    stripStega(pageCoverImageUrl) ||
    stripStega(settings?.defaultOgImageUrl) ||
    '/favicon.png';

  // 04. Social Title & Description (OG & Twitter do not inherit template, so ensure brand is present)
  const fullBrandedTitle = isCustomOrFullTitle ? rawTitle : `${rawTitle} | ${siteTitle}`;
  const ogTitle = stripStega(seo?.ogTitle) || fullBrandedTitle;
  const ogDescription = stripStega(seo?.ogDescription) || resolvedDescription;

  // 05. Keywords
  const rawKeywords = [...(seo?.keywords || []), ...keywords, ...(settings?.siteKeywords || [])]
    .map((k) => stripStega(k))
    .filter(Boolean);

  const mergedKeywords = Array.from(new Set(rawKeywords));

  // 06. Canonical URL
  const canonicalUrl =
    stripStega(seo?.canonicalUrl) ||
    (canonicalPath
      ? `${BASE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`
      : undefined);

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
      ...(type === 'article' && publishedTime ? { publishedTime: stripStega(publishedTime) } : {}),
      ...(type === 'article' && authors?.length
        ? { authors: authors.map((a) => stripStega(a)) }
        : {}),
      images: resolvedOgImage
        ? [
            {
              url: resolvedOgImage,
              width: 1200,
              height: 630,
              alt: stripStega(seo?.metaTitle) || fullBrandedTitle,
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
      ? { google: stripStega(settings.googleSiteVerification) }
      : undefined,
  };
}
