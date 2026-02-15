import { BehaviorSubject } from "rxjs";
import transform from "lodash/transform";
import find from "lodash/find";
import { nanoid } from "nanoid";

import type { TMaybeAsync, TRecordJson } from "~/types";
import { cloned } from "~/utils/cloned";
import { coreHasOwn as hasOwn } from "~/utils/core-has-own";
import { deepmerge } from "~/utils/deepmerge";
import { CollectionsBase } from "~/services/docs/base";

const merge = deepmerge();
export class CollectionsDriverMemory extends CollectionsBase {
  data$ = new BehaviorSubject<TRecordJson[]>([]);

  private static cached: { [key: string]: CollectionsDriverMemory } = {};

  private constructor(private collectionName: string) {
    super();
    CollectionsDriverMemory.cached[this.collectionName] = this;
  }

  // batch commit keys records
  commit(...patches: TRecordJson[]) {
    if (0 === patches.length) return;
    const ls = cloned(this.data$.getValue());

    // stored keys for lookup
    const tbl = ls.reduce(
      (res, node) => {
        res[(<any>node).id] = 1;
        return res;
      },
      <any>{},
    );

    // batch upsert nodes
    this.data$.next(
      transform(
        patches,
        (patched, patch) => {
          patch.id ??= nanoid();
          if (hasOwn(tbl, patch.id)) {
            // node existis, patch
            merge(find(patched, { id: patch.id })!, patch);
          } else {
            // node not found, add
            patched.push(patch);
          }
          return patched;
        },
        ls,
      ),
    );
  }

  // drop records by key
  rm(...ids: string[]) {
    if (0 === ids.length) return;
    this.data$.next(
      this.data$
        .getValue()
        .filter((node) => ids.every((id_) => id_ !== node.id)),
    );
  }

  count() {
    return this.data$.getValue().length;
  }

  // load upstream
  async pull() {}

  static single(collectionName: string) {
    return (
      CollectionsDriverMemory.cached[collectionName] ??
      new CollectionsDriverMemory(collectionName)
    );
  }
}
