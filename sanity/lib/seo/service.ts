import type { ServiceData, SiteSettingsData } from '../types';
import { BASE_URL, stripStega } from './utils';

/**
 * Builds Schema.org Service schema for single pathways or service directory
 * Applicable for: "Service"
 */
export function buildServiceJsonLd(
  services: ServiceData[] | ServiceData,
  settings?: SiteSettingsData
) {
  const list = Array.isArray(services) ? services : [services];
  const siteTitle = stripStega(settings?.siteTitle) || 'Elvin Ediz Immigration Services';

  if (list.length === 1) {
    const s = list[0];
    const cleanSlug = stripStega(s.slug);
    const serviceUrl = `${BASE_URL}/services?tab=${cleanSlug}`;

    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: stripStega(s.title),
      description: stripStega(s.summary),
      serviceType: 'Canadian Immigration Consulting',
      provider: {
        '@type': 'LegalService',
        name: siteTitle,
        url: BASE_URL,
      },
      areaServed: {
        '@type': 'Country',
        name: 'Canada',
      },
      url: serviceUrl,
      offers: s.features?.length
        ? {
            '@type': 'Offer',
            description: s.features.map((f) => stripStega(f)).join(', '),
          }
        : undefined,
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Canadian Immigration Services',
    description:
      'Immigration representation and visa assessment services by Elvin Ediz Immigration Services.',
    itemListElement: list.map((s, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: stripStega(s.title),
        description: stripStega(s.summary),
        url: `${BASE_URL}/services?tab=${stripStega(s.slug)}`,
        provider: {
          '@type': 'LegalService',
          name: siteTitle,
        },
      },
    })),
  };
}
