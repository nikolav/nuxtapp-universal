import type { RequestExtendedOptions } from "graphql-request";
import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

import type {
  TMaybeAsync,
  TOrNoValue,
  TRecordJson,
  TUseProcessMonitorReturnType,
} from "~/types";

import { CollectionsBase } from "~/services/docs/base";

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
  }

  // batch commit keys records
  commit(...patches: TRecordJson[]) {}

  // drop records by key
  rm(...ids: string[]) {}

  // load from upstream
  pull() {}

  // init() {}
  // destroy() {}
}
