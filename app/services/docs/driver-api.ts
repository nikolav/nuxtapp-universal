import type { Observable } from "rxjs";
import type { RequestExtendedOptions } from "graphql-request";
import { BehaviorSubject } from "rxjs";
import { filter, map } from "rxjs/operators";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

import type {
  TOrNoValue,
  TRecordJson,
  TUseProcessMonitorReturnType,
} from "~/types";
import { CollectionsBase } from "~/services/docs/base";
import {
  M_collectionBatchUpsert,
  M_collectionDropIds,
  Q_collectionByTag,
  Q_collectionByTagCount,
} from "~/graphql";

export class CollectionsDriverApi extends CollectionsBase {
  data$ = new BehaviorSubject<TRecordJson[]>([]);

  constructor(
    private ps: TUseProcessMonitorReturnType,
    private collectionName: string,
    private gql: (
      options: Partial<RequestExtendedOptions>,
    ) => Observable<TRecordJson>,
    private getToken: () => TOrNoValue<string>,
  ) {
    super();
    if (isEmpty(this.collectionName))
      throw new Error("No collection name provided.");
  }

  // batch commit keys records
  async commit(...patches: TRecordJson[]) {
    if (isEmpty(patches)) return;
    await this.ps.monitor(() =>
      this.gql(
        this.withHeaders({
          document: M_collectionBatchUpsert,
          variables: { tag: this.collectionName, patches },
        }),
      ),
    );
  }

  // drop records by key
  async rm(...ids: number[]) {
    if (isEmpty(ids)) return;
    await this.ps.monitor(() =>
      this.gql(
        this.withHeaders({
          document: M_collectionDropIds,
          variables: { tag: this.collectionName, ids },
        }),
      ),
    );
  }

  // load from upstream
  async pull() {
    this.data$.next(
      (await this.ps.monitor(() =>
        this.gql(
          this.withHeaders({
            document: Q_collectionByTag,
            variables: { tag: this.collectionName },
          }),
        ).pipe(
          filter((res) => true === get(res, "collectionByTag.ok")),
          map((res) => <TRecordJson[]>get(res, "collectionByTag.result", [])),
        ),
      ))!,
    );
  }

  async count() {
    return (await this.ps.monitor(() =>
      this.gql(
        this.withHeaders({
          document: Q_collectionByTagCount,
          variables: { tag: this.collectionName },
        }),
      ).pipe(
        filter((res) => true === get(res, "collectionByTagCount.ok")),
        map((res) => Number(get(res, "collectionByTagCount.result", 0))),
      ),
    ))!;
  }

  override async init() {
    await this.pull();
  }

  // destroy() {}

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
