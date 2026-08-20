import type { ServiceData, SiteSettingsData } from '../types';
import { BASE_URL } from './utils';

/**
 * Builds Schema.org Service schema for single pathways or service directory
 * Applicable for: "Service"
 */
export function buildServiceJsonLd(
  services: ServiceData[] | ServiceData,
  settings?: SiteSettingsData
) {
  const list = Array.isArray(services) ? services : [services];

  if (list.length === 1) {
    const s = list[0];
    const serviceUrl = `${BASE_URL}/services?tab=${s.slug}`;

    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.title,
      description: s.summary,
      serviceType: 'Canadian Immigration Consulting',
      provider: {
        '@type': 'LegalService',
        name: settings?.siteTitle || 'Elvin Ediz Immigration Services',
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
            description: s.features.join(', '),
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
        name: s.title,
        description: s.summary,
        url: `${BASE_URL}/services?tab=${s.slug}`,
        provider: {
          '@type': 'LegalService',
          name: settings?.siteTitle || 'Elvin Ediz Immigration Services',
        },
      },
    })),
  };
}
