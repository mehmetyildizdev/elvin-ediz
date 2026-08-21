import languagesData from './languages.json';

export type LanguageId = 'en' | 'tr' | 'ar' | 'fr' | string;

export interface LanguageDefinition {
  id: LanguageId;
  title: string;
  isDefault?: boolean;
  direction?: 'ltr' | 'rtl';
}

export interface I18nConfigData {
  defaultLanguage: LanguageId;
  languages: LanguageDefinition[];
  schemaTypes: string[];
}

const config: I18nConfigData = languagesData as I18nConfigData;

export const defaultLanguage: LanguageId = config.defaultLanguage;
export const supportedLanguages: LanguageDefinition[] = config.languages;
export const i18nSchemaTypes: string[] = config.schemaTypes;

/**
 * Configuration options for `@sanity/document-internationalization`
 */
export const documentI18nConfig = {
  supportedLanguages: supportedLanguages.map((lang) => ({
    id: lang.id,
    title: lang.title,
  })),
  schemaTypes: i18nSchemaTypes,
  languageField: 'language',
  apiVersion: '2024-01-01',
};

/**
 * Configuration options for `sanity-plugin-internationalized-array`
 * for modular field-level translation support
 */
export const internationalizedArrayConfig = {
  languages: supportedLanguages.map((lang) => ({
    id: lang.id,
    title: lang.title,
  })),
  defaultLanguages: [defaultLanguage],
  fieldTypes: ['string', 'text'],
};

export default {
  defaultLanguage,
  supportedLanguages,
  i18nSchemaTypes,
  documentI18nConfig,
  internationalizedArrayConfig,
};
