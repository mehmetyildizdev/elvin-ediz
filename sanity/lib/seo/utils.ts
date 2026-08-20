export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://elvinediz.com';

/**
 * Converts portable text blocks, arrays, or string into clean plain text for schema descriptions
 */
export function toPlainText(val: any): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (Array.isArray(val)) {
    return val
      .map((block) => {
        if (block._type !== 'block' || !block.children) {
          if (typeof block === 'string') return block;
          return '';
        }
        return block.children.map((child: any) => child.text || '').join('');
      })
      .join('\n\n');
  }
  return '';
}
