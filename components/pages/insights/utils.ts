// Lightweight helper to remove invisible Sanity Stega encoding characters for robust logic & URLs
export function cleanStega(value?: string): string {
  if (!value || typeof value !== 'string') return '';
  return value
    .replace(/[\u200B-\u200D\uFEFF\uFE00-\uFE0F]/g, '')
    .replace(/[\u{E0000}-\u{E007F}]/gu, '')
    .trim()
    .toLowerCase();
}

export function formatDate(dateStr?: string, options?: Intl.DateTimeFormatOptions): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', options || {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
