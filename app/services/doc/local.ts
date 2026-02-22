import { BehaviorSubject } from "rxjs";
import reduce from "lodash/reduce";
import unset from "lodash/unset";

import { CacheByKeyBase } from "./base";
import { deepmerge } from "~/utils/deepmerge";
import { cloned } from "~/utils/cloned";
import type { TRecordJson, TUseProcessMonitorReturnType } from "~/types";

const merge = deepmerge();

export class CacheByKeyDriverLocal extends CacheByKeyBase {
  private static caches = <Record<string, CacheByKeyDriverLocal>>{};

  data$ = new BehaviorSubject(<TRecordJson>{});

  private constructor(
    private ps: TUseProcessMonitorReturnType,
    private key: string,
  ) {
    super();
    CacheByKeyDriverLocal.caches[this.key] = this;
  }

  async push(patch: TRecordJson) {
    this.data$.next(
      (await this.ps.monitor(() =>
        merge(<TRecordJson>{}, this.data$.getValue(), patch),
      ))!,
    );
  }

  async drop(...paths: string[]) {
    this.data$.next(
      (await this.ps.monitor(() =>
        reduce(
          paths,
          (res, path) => {
            unset(res, path);
            return res;
          },
          cloned(this.data$.getValue()),
        ),
      ))!,
    );
  }

  override pull() {}

  static single(ps: TUseProcessMonitorReturnType, key: string) {
    return (
      CacheByKeyDriverLocal.caches[key] ?? new CacheByKeyDriverLocal(ps, key)
    );
  }

  override destroy() {
    this.data$.complete();
    delete CacheByKeyDriverLocal.caches[this.key];
  }
}
