import Knex from "knex";

export type TOrNoValue<T = unknown> = T | undefined | null;
export type TKnex = TOrNoValue<ReturnType<typeof Knex>>;

// interface:caches
export type TCacheKey = string;
export type TCacheInputOptions = { ttlMs?: number };
export abstract class CacheBase<T = unknown> {
  /** Get value; returns null when missing or expired */
  abstract get(key: TCacheKey): Promise<TOrNoValue<T>>;

  /** Set value; ttlMs is optional */
  abstract set(
    key: TCacheKey,
    value: T,
    opts?: TCacheInputOptions,
  ): Promise<void>;

  /** Remove a key */
  abstract del(key: TCacheKey): Promise<void>;

  /** Optional: clear everything (not all backends support it) */
  abstract clear(): Promise<void>;

  /** Optional: check existence (should treat expired as missing) */
  abstract has(key: TCacheKey): Promise<boolean>;
}
// #caches:keyv
export type TCacheConnection = "memory" | "redis";
