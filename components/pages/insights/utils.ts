export function cleanStega(value?: any): string {
  if (!value) return '';
  const str = typeof value === 'string' ? value : value?.current || String(value);
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\uFE00-\uFE0F]/g, '')
    .replace(/[\u{E0000}-\u{E007F}]/gu, '')
    .trim()
    .toLowerCase();
}

export function getLocalizedPostHref(
  post: { slug?: any; language?: string },
  defaultKind: string = 'insights',
  activeLang: string = 'en'
): string {
  const slug = cleanStega(post.slug || '');
  const lang = post.language || (activeLang !== 'en' ? activeLang : 'en');
  const kind = defaultKind.startsWith('/') ? defaultKind : `/${defaultKind}`;

  if (lang && lang !== 'en') {
    return `/${lang}${kind}/${slug}`;
  }
  return `${kind}/${slug}`;
}

const localeMap: Record<string, string> = {
  tr: 'tr-TR',
  en: 'en-US',
  fr: 'fr-FR',
  ar: 'ar-SA',
  es: 'es-ES',
  zh: 'zh-CN',
  fa: 'fa-IR',
  ru: 'ru-RU',
  pt: 'pt-BR',
};

export function getLocale(lang: string = 'en'): string {
  const clean = cleanStega(lang);
  return localeMap[clean] || clean || 'en-US';
}

export function formatDate(
  dateStr?: string,
  options?: Intl.DateTimeFormatOptions,
  lang: string = 'en'
): string {
  if (!dateStr) return '';
  try {
    const locale = getLocale(lang);
    return new Date(dateStr).toLocaleDateString(
      locale,
      options || {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }
    );
  } catch {
    return dateStr;
  }
}
