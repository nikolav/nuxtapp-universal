import type { BehaviorSubject } from "rxjs";

import type { TMaybeAsync, TRecordJson } from "~/types";

export abstract class CollectionsBase<TNode extends TRecordJson = TRecordJson> {
  abstract data$: BehaviorSubject<TNode[]>;

  // batch commit keys records
  abstract commit(...patches: TRecordJson[]): TMaybeAsync<void>;

  // drop records by key
  abstract rm(...keys: any[]): TMaybeAsync<void>;

  // count upsteam docs
  abstract count(): TMaybeAsync<number>;

  // load from upstream
  abstract pull(): TMaybeAsync<void>;

  init(): TMaybeAsync<void> {}
  destroy(): TMaybeAsync<void> {}
}
