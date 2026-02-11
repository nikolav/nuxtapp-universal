import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { map } from "rxjs/operators";
import type { RequestExtendedOptions } from "graphql-request";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

import { CacheByKeyBase } from "~/services/doc/base";
import { resolved } from "~/utils/resolved";
import {
  M_docCacheByKeyPatch,
  M_docCacheByKeyPathsDrop,
  Q_docCacheByKey,
} from "~/graphql";
import type { TOrNoValue, TRecordJson } from "~/types";

export class CacheByKeyDriverApi extends CacheByKeyBase {
  data$ = new BehaviorSubject(<TRecordJson>{});

  constructor(
    private key: string,
    private gql: (
      options: Partial<RequestExtendedOptions>,
    ) => Observable<TRecordJson>,
    private getToken: () => TOrNoValue<string>,
  ) {
    super();
  }

  // batch set keys,
  push(patch: TRecordJson) {
    resolved(
      isEmpty(patch)
        ? EMPTY
        : this.gql(
            this.withHeaders({
              document: M_docCacheByKeyPatch,
              variables: { key: this.key, patch },
            }),
          ),
    );
  }

  // drop keys
  drop(...paths: string[]) {
    resolved(
      isEmpty(paths)
        ? EMPTY
        : this.gql(
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
      await resolved(
        this.gql(
          this.withHeaders({
            document: Q_docCacheByKey,
            variables: { key: this.key },
          }),
        ).pipe(
          map((res) => <TRecordJson>get(res, "data.docCacheByKey.result", {})),
        ),
      ),
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
