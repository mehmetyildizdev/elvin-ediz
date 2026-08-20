import type { FaqPageData, FaqItem } from '../types';
import { toPlainText, stripStega } from './utils';

/**
 * Builds Schema.org FAQPage schema with question/answer pairs
 * Applicable for: "FAQPage"
 */
export function buildFaqJsonLd(faqPageData?: FaqPageData) {
  const items: FaqItem[] = faqPageData?.items || [];
  if (!items.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: stripStega(item.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: toPlainText(item.answer),
      },
    })),
  };
}
