import { BehaviorSubject, filter, tap } from "rxjs";
import reduce from "lodash/reduce";
import unset from "lodash/unset";

import { CacheByKeyBase } from "./base";
import { deepmerge } from "~/utils/deepmerge";
import { cloned } from "~/utils/cloned";
import { to$ } from "~/utils/to-obs";
import { isPresent } from "~/utils/is-present";
import { resolved } from "~/utils/resolved";
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
      await this.ps.monitor(() => merge(this.data$.getValue(), patch)),
    );
  }

  async drop(...paths: string[]) {
    await resolved(
      to$(
        this.ps.monitor(() =>
          reduce(
            paths,
            (res, path) => {
              unset(res, path);
              return res;
            },
            cloned(this.data$.getValue()),
          ),
        ),
      ).pipe(
        filter(isPresent),
        tap((d) => {
          this.data$.next(d);
        }),
      ),
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
