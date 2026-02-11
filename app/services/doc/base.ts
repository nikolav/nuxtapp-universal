import type { BehaviorSubject, Observable } from "rxjs";
import type { TMaybeAsync, TRecordJson } from "~/types";

export interface ICacheByKeyOptions {
  // time-to-live in milliseconds
  ttlMs?: number;
}

export abstract class CacheByKeyBase {
  // stream cached data for key
  abstract data$: BehaviorSubject<TRecordJson>;

  // batch commit keys
  abstract push(
    patch: TRecordJson,
    opts?: ICacheByKeyOptions,
  ): TMaybeAsync<void>;

  // drop keys
  abstract drop(...paths: string[]): TMaybeAsync<void>;

  // load cached data
  abstract pull(): TMaybeAsync<void>;

  init() {}
  destroy() {}
}
