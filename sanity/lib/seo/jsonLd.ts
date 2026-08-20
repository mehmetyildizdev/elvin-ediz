import type { PostData, SiteSettingsData } from '../types';
import { buildOrganizationJsonLd } from './organization';
import { buildArticleJsonLd } from './article';
import { buildServiceJsonLd } from './service';
import { buildFaqJsonLd } from './faq';
import { buildWebPageJsonLd } from './webpage';

export {
  buildOrganizationJsonLd,
  buildArticleJsonLd,
  buildServiceJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
};

/**
 * Builds JSON-LD structured data for single posts with full dropdown option support
 */
export function buildPostJsonLd(post: PostData, settings?: SiteSettingsData) {
  const structuredType = post.seo?.structuredDataType || 'auto';

  // 1. If explicitly set to Organization
  if (structuredType === 'Organization') {
    return buildOrganizationJsonLd(settings);
  }

  // 2. If explicitly set to Service
  if (structuredType === 'Service') {
    return buildServiceJsonLd(
      {
        _id: post._id,
        title: post.title,
        slug: post.slug,
        order: 0,
        iconName: post.iconName || 'shield',
        summary: post.excerpt || post.title,
        features: post.checklistItems || [],
      },
      settings
    );
  }

  // 3. If explicitly set to AboutPage
  if (structuredType === 'AboutPage') {
    const authorName = post.authorName || 'Nazly Sunguroglu, RCIC';
    const authorRole = post.authorRole || 'Regulated Canadian Immigration Consultant';

    return buildWebPageJsonLd({
      title: post.title,
      description: post.excerpt || post.title,
      url: `/insights/${post.slug}`,
      type: 'AboutPage',
      settings,
    });
  }

  // 4. If explicitly set to ContactPage
  if (structuredType === 'ContactPage') {
    return buildWebPageJsonLd({
      title: post.title,
      description: post.excerpt || post.title,
      url: `/insights/${post.slug}`,
      type: 'ContactPage',
      settings,
    });
  }

  // 5. If explicitly set to CollectionPage
  if (structuredType === 'CollectionPage') {
    return buildWebPageJsonLd({
      title: post.title,
      description: post.excerpt || post.title,
      url: `/insights/${post.slug}`,
      type: 'CollectionPage',
      settings,
    });
  }

  // 6. If explicitly set to WebPage
  if (structuredType === 'WebPage') {
    return buildWebPageJsonLd({
      title: post.title,
      description: post.excerpt || post.title,
      url: `/insights/${post.slug}`,
      type: 'WebPage',
      settings,
    });
  }

  // 7. If explicitly set to FAQPage
  if (structuredType === 'FAQPage' && post.checklistItems?.length) {
    return buildFaqJsonLd({
      items: post.checklistItems.map((item) => ({
        question: item,
        answer: `Requirement for ${post.title}: ${item}`,
      })),
    });
  }

  // 8. Default: Article / NewsArticle
  return buildArticleJsonLd(post, settings);
}

export interface PageJsonLdOptions {
  title: string;
  description?: string;
  url: string;
  defaultType?: 'Organization' | 'Service' | 'FAQPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'WebPage' | 'Article' | 'NewsArticle';
  structuredDataType?: string;
  settings?: SiteSettingsData;
  services?: import('../types').ServiceData[];
  faqPageData?: import('../types').FaqPageData;
}

/**
 * Builds JSON-LD structured data for any singleton page, automatically using defaultType
 * when set to 'auto' or undefined, but honoring any Studio dropdown override when changed.
 */
export function buildPageJsonLd(options: PageJsonLdOptions) {
  const {
    title,
    description = '',
    url,
    defaultType = 'WebPage',
    structuredDataType,
    settings,
    services,
    faqPageData,
  } = options;

  const resolvedType =
    structuredDataType && structuredDataType !== 'auto'
      ? structuredDataType
      : defaultType;

  // 1. Organization & Home
  if (resolvedType === 'Organization') {
    return buildOrganizationJsonLd(settings);
  }

  // 2. Service
  if (resolvedType === 'Service') {
    return buildServiceJsonLd(services || [], settings);
  }

  // 3. FAQPage
  if (resolvedType === 'FAQPage' && faqPageData) {
    return buildFaqJsonLd(faqPageData);
  }

  // 4. AboutPage, ContactPage, CollectionPage, WebPage
  if (
    resolvedType === 'AboutPage' ||
    resolvedType === 'ContactPage' ||
    resolvedType === 'CollectionPage' ||
    resolvedType === 'WebPage'
  ) {
    return buildWebPageJsonLd({
      title,
      description,
      url,
      type: resolvedType,
      settings,
    });
  }

  // 5. Default fallback
  return buildWebPageJsonLd({
    title,
    description,
    url,
    type: 'WebPage',
    settings,
  });
}
