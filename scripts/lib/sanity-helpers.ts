import type { SanityClient } from '@sanity/client';
import { logger } from './logger';
import type { TaskContext } from '../types';

export type SanityDocumentPayload = {
  _id: string;
  _type: string;
  [key: string]: any;
};

/**
 * Creates or patches a document in Sanity.
 * If ctx.dryRun is true, it logs what it would do without mutating.
 */
export async function upsertDocument<T extends SanityDocumentPayload>(
  ctx: TaskContext,
  doc: T
): Promise<void> {
  const { _id, _type, ...patchData } = doc;

  if (ctx.dryRun) {
    logger.dryRun(`Upsert document [${_type}] with _id: ${_id}`);
    return;
  }

  try {
    await ctx.client.createIfNotExists({ _id, _type, ...patchData });
    await ctx.client.patch(_id).set(patchData).commit();
    logger.success(`Synced [${_type}] -> ${_id}`);
  } catch (err) {
    logger.error(`Failed to upsert ${_id} (${_type})`, err);
    throw err;
  }
}

/**
 * Batch upserts an array of documents in chunks using Sanity transactions.
 */
export async function batchUpsert<T extends SanityDocumentPayload>(
  ctx: TaskContext,
  docs: T[],
  chunkSize: number = 25
): Promise<void> {
  if (ctx.dryRun) {
    logger.dryRun(`Batch upserting ${docs.length} documents in chunks of ${chunkSize}`);
    for (const doc of docs) {
      logger.dryRun(`  - [${doc._type}] ${doc._id}`);
    }
    return;
  }

  for (let i = 0; i < docs.length; i += chunkSize) {
    const chunk = docs.slice(i, i + chunkSize);
    const tx = ctx.client.transaction();

    for (const doc of chunk) {
      const { _id, _type, ...patchData } = doc;
      tx.createIfNotExists({ _id, _type, ...patchData });
      tx.patch(_id, (p) => p.set(patchData));
    }

    try {
      await tx.commit();
      logger.success(
        `Committed batch ${Math.floor(i / chunkSize) + 1}/${Math.ceil(docs.length / chunkSize)} (${chunk.length} docs)`
      );
    } catch (err) {
      logger.error(`Batch transaction failed at chunk starting index ${i}`, err);
      throw err;
    }
  }
}
