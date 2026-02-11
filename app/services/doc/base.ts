import type { BehaviorSubject, Observable } from "rxjs";
import type { TMaybeAsync, TRecordJson } from "~/types";

export interface ICacheByKeyOptions {
  /** time-to-live in milliseconds */
  ttlMs?: number;
}

export abstract class CacheByKeyBase {
  // data stream for key
  abstract data$: BehaviorSubject<TRecordJson>;

  // batch set keys,
  abstract push(
    patch: TRecordJson,
    opts?: ICacheByKeyOptions,
  ): TMaybeAsync<void>;

  // drop keys
  abstract drop(...paths: string[]): TMaybeAsync<void>;

  init() {}
  destroy() {}
}
