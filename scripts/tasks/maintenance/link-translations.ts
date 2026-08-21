import { logger } from '../../lib/logger';
import type { Task, TaskContext } from '../../types';
import { i18nSchemaTypes } from '@/sanity/i18n/config';

interface CMSDoc {
  _id: string;
  _type: string;
  language?: string;
  slug?: string;
  title?: string;
  name?: string;
}

interface TranslationItem {
  _key: string;
  _type: string;
  language: string;
  value: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
  };
}

interface TranslationMetadataDoc {
  _id: string;
  _type: 'translation.metadata';
  schemaTypes?: string[];
  translations: TranslationItem[];
}

const SINGLETON_TYPES = new Set([
  'homePage',
  'insightsPage',
  'servicesPage',
  'aboutPage',
  'faqPage',
  'privacyPage',
  'siteSettings',
]);

export const linkTranslationsTask: Task = {
  id: 'link-translations',
  name: 'Audit & Link Translation Metadata',
  description:
    'Audits all localized documents across Sanity, detects unlinked translations, and safely links them into translation.metadata without overwriting existing links.',
  run: async (ctx: TaskContext) => {
    logger.header('Auditing Translation Metadata & Unlinked Documents');

    // 1. Fetch all translation.metadata documents
    const metadataDocs = await ctx.client.fetch<TranslationMetadataDoc[]>(
      `*[_type == "translation.metadata"]{
        _id,
        _type,
        schemaTypes,
        translations
      }`
    );

    // 2. Fetch all published documents belonging to i18nSchemaTypes
    const allDocs = await ctx.client.fetch<CMSDoc[]>(
      `*[_type in $types && !(_id in path("drafts.**"))]{
        _id,
        _type,
        language,
        "slug": slug.current,
        title,
        name
      }`,
      { types: i18nSchemaTypes }
    );

    logger.info(
      `Auditing ${allDocs.length} published document(s) and ${metadataDocs.length} metadata record(s)...`
    );

    // 3. Map referenced doc IDs to their metadata document
    const docToMetadataMap = new Map<
      string,
      { metadata: TranslationMetadataDoc; language: string }
    >();
    const metadataById = new Map<string, TranslationMetadataDoc>();

    for (const meta of metadataDocs) {
      metadataById.set(meta._id, meta);
      if (Array.isArray(meta.translations)) {
        for (const item of meta.translations) {
          const refId = item.value?._ref;
          if (refId) {
            docToMetadataMap.set(refId, { metadata: meta, language: item.language });
          }
        }
      }
    }

    // 4. Separate English/Base docs from Translated docs
    const enDocsByType = new Map<string, CMSDoc[]>();
    const translatedDocs: CMSDoc[] = [];

    for (const doc of allDocs) {
      const lang = doc.language || 'en';
      if (lang === 'en') {
        const list = enDocsByType.get(doc._type) || [];
        list.push(doc);
        enDocsByType.set(doc._type, list);
      } else {
        translatedDocs.push(doc);
      }
    }

    let healthyCount = 0;
    let newlyLinkedCount = 0;
    let conflictSkippedCount = 0;
    let orphanCount = 0;

    // Helper: find candidate English base document for a given translated document
    function findBaseDoc(doc: CMSDoc): CMSDoc | undefined {
      const candidates = enDocsByType.get(doc._type) || [];
      if (candidates.length === 0) return undefined;

      // Suffix / ID matching: e.g. "aboutPage-tr" -> "aboutPage" or "post-slug-tr" -> "post-slug"
      const suffixPattern = new RegExp(`[-_]${doc.language}$`, 'i');
      const baseIdCandidate = doc._id.replace(suffixPattern, '');
      const exactIdMatch = candidates.find((c) => c._id === baseIdCandidate);
      if (exactIdMatch) return exactIdMatch;

      // Singleton matching: if there is only 1 EN singleton of this type
      if (SINGLETON_TYPES.has(doc._type)) {
        return candidates.find((c) => c._id === doc._type) || candidates[0];
      }

      // Slug matching
      if (doc.slug) {
        const slugMatch = candidates.find((c) => c.slug === doc.slug);
        if (slugMatch) return slugMatch;
      }

      // Title/Name matching
      if (doc.title) {
        const titleMatch = candidates.find((c) => c.title === doc.title);
        if (titleMatch) return titleMatch;
      }
      if (doc.name) {
        const nameMatch = candidates.find((c) => c.name === doc.name);
        if (nameMatch) return nameMatch;
      }

      // Fallback: If only 1 EN document of this schema type exists
      if (candidates.length === 1) {
        return candidates[0];
      }

      return undefined;
    }

    // 5. Process translated documents
    for (const doc of translatedDocs) {
      const lang = doc.language!;
      const existingLink = docToMetadataMap.get(doc._id);

      if (existingLink) {
        healthyCount++;
        continue;
      }

      logger.warn(`Unlinked translation detected: [${doc._type}] "${doc._id}" (lang: ${lang})`);

      const baseDoc = findBaseDoc(doc);
      if (!baseDoc) {
        logger.error(
          `  ↳ No matching English base document found for [${doc._type}] "${doc._id}". Flagged as orphan.`
        );
        orphanCount++;
        continue;
      }

      logger.info(`  ↳ Found matching English base: [${baseDoc._type}] "${baseDoc._id}"`);

      // Check if baseDoc already has a metadata record
      const baseLink = docToMetadataMap.get(baseDoc._id);

      if (baseLink) {
        const meta = baseLink.metadata;
        const currentTranslationForLang = meta.translations?.find((t) => t.language === lang);

        if (currentTranslationForLang) {
          // Safeguard against overwriting
          const existingRef = currentTranslationForLang.value?._ref;
          logger.warn(
            `  ↳ [SKIPPED CONFLICT] Metadata (${meta._id}) already has an active translation for "${lang}" -> "${existingRef}". Preserving existing link, will not overwrite.`
          );
          conflictSkippedCount++;
          continue;
        }

        // Add translation to existing metadata
        logger.info(`  ↳ Linking to existing metadata (${meta._id})...`);
        const newTranslationItem: TranslationItem = {
          _key: lang,
          _type: 'internationalizedArrayReferenceValue',
          language: lang,
          value: {
            _type: 'reference',
            _ref: doc._id,
            _weak: true,
          },
        };

        if (ctx.dryRun) {
          logger.dryRun(`  ↳ Would patch metadata (${meta._id}) adding "${lang}" -> "${doc._id}"`);
        } else {
          await ctx.client
            .patch(meta._id)
            .setIfMissing({ translations: [] })
            .append('translations', [newTranslationItem])
            .commit();

          meta.translations.push(newTranslationItem);
          docToMetadataMap.set(doc._id, { metadata: meta, language: lang });
          logger.success(`  ✔ Linked "${doc._id}" (${lang}) to metadata (${meta._id})`);
        }
        newlyLinkedCount++;
      } else {
        // Create brand new metadata record linking baseDoc and this translation
        logger.info(`  ↳ Creating new translation.metadata for [${doc._type}]...`);
        const newMetaRecord: Omit<TranslationMetadataDoc, '_id'> = {
          _type: 'translation.metadata',
          schemaTypes: [doc._type],
          translations: [
            {
              _key: 'en',
              _type: 'internationalizedArrayReferenceValue',
              language: 'en',
              value: {
                _type: 'reference',
                _ref: baseDoc._id,
                _weak: true,
              },
            },
            {
              _key: lang,
              _type: 'internationalizedArrayReferenceValue',
              language: lang,
              value: {
                _type: 'reference',
                _ref: doc._id,
                _weak: true,
              },
            },
          ],
        };

        if (ctx.dryRun) {
          logger.dryRun(
            `  ↳ Would create metadata linking "${baseDoc._id}" [EN] and "${doc._id}" [${lang}]`
          );
        } else {
          const created = await ctx.client.create(newMetaRecord);
          const fullMeta: TranslationMetadataDoc = {
            _id: created._id,
            ...newMetaRecord,
          };
          metadataById.set(created._id, fullMeta);
          docToMetadataMap.set(baseDoc._id, { metadata: fullMeta, language: 'en' });
          docToMetadataMap.set(doc._id, { metadata: fullMeta, language: lang });
          logger.success(
            `  ✔ Created metadata (${created._id}) linking "${baseDoc._id}" [EN] & "${doc._id}" [${lang}]`
          );
        }
        newlyLinkedCount++;
      }
    }

    logger.header('Translation Audit Summary');
    logger.info(`✔ Healthy & already linked: ${healthyCount}`);
    logger.info(`✔ Newly linked translations: ${newlyLinkedCount}`);
    if (conflictSkippedCount > 0) {
      logger.warn(`⚠ Skipped conflict(s) (existing link preserved): ${conflictSkippedCount}`);
    }
    if (orphanCount > 0) {
      logger.error(`✖ Orphan translated doc(s) without base: ${orphanCount}`);
    }
    logger.footer('Translation Audit Complete');
  },
};
