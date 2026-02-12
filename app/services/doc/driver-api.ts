import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import type { RequestExtendedOptions } from "graphql-request";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

import {
  M_docCacheByKeyPatch,
  M_docCacheByKeyPathsDrop,
  Q_docCacheByKey,
} from "~/graphql";
import { CacheByKeyBase } from "~/services/doc/base";
import type {
  TOrNoValue,
  TRecordJson,
  TUseProcessMonitorReturnType,
} from "~/types";

export class CacheByKeyDriverApi extends CacheByKeyBase {
  data$ = new BehaviorSubject(<TRecordJson>{});

  constructor(
    private ps: TUseProcessMonitorReturnType,
    private key: string,
    private gql: (
      options: Partial<RequestExtendedOptions>,
    ) => Observable<TRecordJson>,
    private getToken: () => TOrNoValue<string>,
  ) {
    super();
  }

  // batch set keys,
  async push(patch: TRecordJson) {
    if (isEmpty(patch)) return;
    await this.ps.monitor(() =>
      this.gql(
        this.withHeaders({
          document: M_docCacheByKeyPatch,
          variables: { key: this.key, patch },
        }),
      ),
    );
  }

  // drop keys
  async drop(...paths: string[]) {
    if (isEmpty(paths)) return;
    await this.ps.monitor(() =>
      this.gql(
        this.withHeaders({
          document: M_docCacheByKeyPathsDrop,
          variables: { key: this.key, paths },
        }),
      ),
    );
  }

  override async init() {
    this.pull();
  }

  override async pull() {
    this.data$.next(
      (await this.ps.monitor(() =>
        this.gql(
          this.withHeaders({
            document: Q_docCacheByKey,
            variables: { key: this.key },
          }),
        ).pipe(
          filter((res) => true === get(res, "docCacheByKey.ok")),
          map((res) => <TRecordJson>get(res, "docCacheByKey.result")),
        ),
      ))!,
    );
  }

  withHeaders(
    opts: Partial<RequestExtendedOptions>,
  ): Partial<RequestExtendedOptions> {
    return {
      ...opts,
      requestHeaders: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    };
  }
}
