import type { SiteSettingsData } from '../types';
import { BASE_URL, stripStega } from './utils';

/**
 * Builds Schema.org Organization, LegalService & WebSite schema
 * Applicable for: Home & Brand ("Organization")
 */
export function buildOrganizationJsonLd(settings?: SiteSettingsData) {
  const siteTitle = stripStega(settings?.siteTitle) || 'Elvin Ediz Immigration Services';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        '@id': `${BASE_URL}/#organization`,
        name: siteTitle,
        url: BASE_URL,
        logo: `${BASE_URL}/favicon.png`,
        image: stripStega(settings?.defaultOgImageUrl) || `${BASE_URL}/favicon.png`,
        telephone: stripStega(settings?.phone) || '(647) 568 1009',
        email: stripStega(settings?.contactEmail) || 'info@elvinediz.com',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: stripStega(settings?.address) || 'Toronto, Ontario, Canada',
          addressLocality: 'Toronto',
          addressRegion: 'ON',
          addressCountry: 'CA',
        },
        founder: {
          '@type': 'Person',
          name: 'Nazly Sunguroglu',
          jobTitle: 'Regulated Canadian Immigration Consultant (RCIC)',
          description: 'CICC Licensed Immigration Consultant #R533968',
          knowsAbout: [
            'Express Entry',
            'Study Permits in Canada',
            'Post-Graduation Work Permits (PGWP)',
            'LMIA Work Permits',
            'Provincial Nominee Programs (PNP)',
            'Spousal & Family Sponsorship',
          ],
        },
        sameAs: [stripStega(settings?.linkedinUrl), stripStega(settings?.instagramUrl)].filter(
          Boolean
        ),
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: siteTitle,
        description:
          stripStega(settings?.defaultMetaDescription) ||
          'Personalized Canadian immigration guidance and representation from Nazly Sunguroglu, RCIC.',
        publisher: {
          '@id': `${BASE_URL}/#organization`,
        },
      },
    ],
  };
}
