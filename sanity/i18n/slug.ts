import type { SlugIsUniqueValidator } from 'sanity';

/**
 * Internationalized slugifier that cleanly handles Turkish characters and diacritics
 */
export function slugifyWithI18n(input: string): string {
  if (!input) return '';
  return input
    .toLowerCase()
    .trim()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

/**
 * Validates that a slug is unique among documents of the same _type and language.
 * Allows multiple translations of a document to share the same slug if needed,
 * or have unique translated slugs per language without cross-language collision warnings.
 */
export const isSlugUniqueByLanguage: SlugIsUniqueValidator = async (slug, context) => {
  const { document, getClient } = context;
  if (!document) return true;

  const client = getClient({ apiVersion: '2024-01-01' });
  const rawId = document._id || '';
  const publishedId = rawId.replace(/^drafts\./, '');
  const draftId = `drafts.${publishedId}`;
  const type = document._type;
  const language = (document as { language?: string })?.language || 'en';

  const query = `!defined(*[
    !(_id in [$draftId, $publishedId]) &&
    _type == $type &&
    slug.current == $slug &&
    ((defined(language) && language == $language) || (!defined(language) && $language == "en"))
  ][0]._id)`;

  const isUnique = await client.fetch<boolean>(query, {
    draftId,
    publishedId,
    type,
    slug,
    language,
  });

  return isUnique;
};

export default {
  slugifyWithI18n,
  isSlugUniqueByLanguage,
};
