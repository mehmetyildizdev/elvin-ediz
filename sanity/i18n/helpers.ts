import { defaultLanguage, supportedLanguages, LanguageId } from './config';

/**
 * Returns GROQ filter clause for document-level internationalization.
 * Defaults to the configured defaultLanguage when not specified or falls back to documents without language field.
 *
 * @example
 * ```ts
 * const query = `*[_type == "post" && ${groqLanguageFilter('$lang')}]{ ... }`
 * ```
 */
export function groqLanguageFilter(languageParam = '$language'): string {
  return `((defined(language) && language == ${languageParam}) || (!defined(language) && ${languageParam} == "${defaultLanguage}"))`;
}

/**
 * Helper to build GROQ translation metadata expansion
 */
export function groqTranslationsExpansion(): string {
  return `
    "_translations": *[_type == "translation.metadata" && references(^._id)][0].translations[].value->{
      _id,
      language,
      "slug": slug.current,
      title
    }
  `;
}

/**
 * Validates if a given language code is supported
 */
export function isValidLanguage(lang: string): lang is LanguageId {
  return supportedLanguages.some((l) => l.id === lang);
}

/**
 * Resolves fallback language code
 */
export function resolveLanguage(lang?: string | null): LanguageId {
  if (lang && isValidLanguage(lang)) {
    return lang;
  }
  return defaultLanguage;
}

/**
 * Returns reading direction for the specified language
 */
export function getLanguageDirection(lang: LanguageId): 'ltr' | 'rtl' {
  const found = supportedLanguages.find((l) => l.id === lang);
  return found?.direction || 'ltr';
}
