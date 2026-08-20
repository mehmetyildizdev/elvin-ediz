import type { SiteSettingsData } from '../types';
import { BASE_URL } from './utils';

export interface WebPageJsonLdOptions {
  title: string;
  description: string;
  url: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  settings?: SiteSettingsData;
}

/**
 * Builds Schema.org WebPage, AboutPage, ContactPage or CollectionPage schema
 * Applicable for: "AboutPage", "ContactPage", "CollectionPage", "WebPage"
 */
export function buildWebPageJsonLd(options: WebPageJsonLdOptions) {
  const { title, description, url, type = 'WebPage', settings } = options;

  const fullUrl = `${BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
  const siteTitle = settings?.siteTitle || 'Elvin Ediz Immigration Services';

  if (type === 'ContactPage') {
    return {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: title,
      description: description,
      url: fullUrl,
      mainEntity: {
        '@type': 'LegalService',
        name: siteTitle,
        telephone: settings?.phone || '(647) 568 1009',
        email: settings?.contactEmail || 'info@elvinediz.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: settings?.address || 'Toronto, Ontario, Canada',
        },
      },
    };
  }

  if (type === 'AboutPage') {
    return {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: title,
      description: description,
      url: fullUrl,
      mainEntity: {
        '@type': 'Person',
        name: 'Nazly Sunguroglu',
        jobTitle: 'Regulated Canadian Immigration Consultant (RCIC)',
        description: 'Founder and Principal Consultant at Elvin Ediz Immigration Services',
        worksFor: {
          '@type': 'LegalService',
          name: siteTitle,
        },
      },
    };
  }

  if (type === 'CollectionPage') {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description: description,
      url: fullUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: siteTitle,
        url: BASE_URL,
      },
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: fullUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: siteTitle,
      url: BASE_URL,
    },
  };
}
