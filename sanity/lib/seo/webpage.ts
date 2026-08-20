import type { SiteSettingsData } from '../types';
import { BASE_URL, stripStega } from './utils';

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

  const cleanUrl = stripStega(url);
  const fullUrl = `${BASE_URL}${cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`}`;
  const siteTitle = stripStega(settings?.siteTitle) || 'Elvin Ediz Immigration Services';
  const cleanTitle = stripStega(title);
  const cleanDescription = stripStega(description);

  if (type === 'ContactPage') {
    return {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: cleanTitle,
      description: cleanDescription,
      url: fullUrl,
      mainEntity: {
        '@type': 'LegalService',
        name: siteTitle,
        telephone: stripStega(settings?.phone) || '(647) 568 1009',
        email: stripStega(settings?.contactEmail) || 'info@elvinediz.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: stripStega(settings?.address) || 'Toronto, Ontario, Canada',
        },
      },
    };
  }

  if (type === 'AboutPage') {
    return {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: cleanTitle,
      description: cleanDescription,
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
      name: cleanTitle,
      description: cleanDescription,
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
    name: cleanTitle,
    description: cleanDescription,
    url: fullUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: siteTitle,
      url: BASE_URL,
    },
  };
}
