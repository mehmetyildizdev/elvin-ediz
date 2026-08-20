export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://elvinediz.com';

/**
 * Strips Sanity visual editing stega invisible unicode characters from strings
 * to ensure 100% clean schema output and meta tags across all environments.
 */
export function stripStega(value?: any): string {
  if (!value) return '';
  const str = typeof value === 'string' ? value : value?.current || String(value);
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\uFE00-\uFE0F]/g, '')
    .replace(/[\u{E0000}-\u{E007F}]/gu, '')
    .trim();
}

/**
 * Converts portable text blocks, arrays, or string into clean plain text for schema descriptions
 */
export function toPlainText(val: any): string {
  if (!val) return '';
  if (typeof val === 'string') return stripStega(val);
  if (Array.isArray(val)) {
    return stripStega(
      val
        .map((block) => {
          if (block._type !== 'block' || !block.children) {
            if (typeof block === 'string') return block;
            return '';
          }
          return block.children.map((child: any) => child.text || '').join('');
        })
        .join('\n\n')
    );
  }
  return '';
}
