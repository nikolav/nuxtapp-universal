import { BehaviorSubject } from "rxjs";
import reduce from "lodash/reduce";
import unset from "lodash/unset";

import { CacheByKeyBase } from "./base";
import { deepmerge } from "~/utils/deepmerge";
import { cloned } from "~/utils/cloned";
import type { TRecordJson } from "~/types";

const merge = deepmerge();

export class CacheByKeyDriverLocal extends CacheByKeyBase {
  private static caches = <Record<string, CacheByKeyDriverLocal>>{};

  data$ = new BehaviorSubject(<TRecordJson>{});

  private constructor(private key: string) {
    super();
    CacheByKeyDriverLocal.caches[this.key] = this;
  }

  push(patch: TRecordJson) {
    this.data$.next(merge(this.data$.getValue(), patch));
  }

  drop(...paths: string[]) {
    this.data$.next(
      reduce(
        paths,
        (res, path) => {
          unset(res, path);
          return res;
        },
        cloned(this.data$.getValue()),
      ),
    );
  }

  override pull() {}

  static single(key: string) {
    return CacheByKeyDriverLocal.caches[key] ?? new CacheByKeyDriverLocal(key);
  }

  override destroy() {
    this.data$.complete();
    delete CacheByKeyDriverLocal.caches[this.key];
  }
}
