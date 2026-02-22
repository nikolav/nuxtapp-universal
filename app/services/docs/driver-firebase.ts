import { BehaviorSubject, EMPTY, from, Observable } from "rxjs";
import {
  catchError,
  endWith,
  ignoreElements,
  mergeMap,
  toArray,
} from "rxjs/operators";
import {
  doc,
  onSnapshot,
  setDoc,
  collection,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import type { Unsubscribe, CollectionReference } from "firebase/firestore";
import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";

import type {
  TOrNoValue,
  TRecordJson,
  TUseProcessMonitorReturnType,
} from "~/types";
import { CollectionsBase } from "~/services/docs/base";
import { firestore } from "~/config/firebase";
import { withTimestamp } from "~/utils/firebase";
import { onDebug } from "~/utils/on-debug";

const CONCURRENCY = 22;
export class CollectionsFirebase extends CollectionsBase {
  data$ = new BehaviorSubject<TRecordJson[]>([]);

  private coll: CollectionReference;
  private unsubscribe: TOrNoValue<Unsubscribe>;

  constructor(
    private ps: TUseProcessMonitorReturnType,
    private collectionPath: string,
    private collectionGroup: string,
    private collectionName: string,
  ) {
    super();
    this.coll = collection(
      firestore,
      this.collectionPath,
      this.collectionGroup,
      this.collectionName,
    );
  }

  commit(...patches: TRecordJson[]) {
    return this.ps.monitor(() =>
      isEmpty(patches)
        ? undefined
        : from(patches).pipe(
            mergeMap(
              (patch) =>
                new Observable<void>((obs) => {
                  (async () => {
                    try {
                      const newDocRef =
                        null != patch.id
                          ? doc(
                              firestore,
                              this.collectionPath,
                              this.collectionGroup,
                              this.collectionName,
                              String(patch.id),
                            )
                          : doc(this.coll);

                      await setDoc(
                        newDocRef,
                        withTimestamp({ data: withoutId(patch) }),
                        {
                          merge: true,
                        },
                      );
                      obs.next();
                      obs.complete();
                    } catch (error) {
                      obs.error(error);
                    }
                  })();
                }),
              CONCURRENCY,
            ),

            // wait, discard all
            toArray(),
            ignoreElements(),

            // emit empty
            endWith(void 0),

            // log errors, pass
            catchError((error) => {
              onDebug({ "docs:fireabse:commit": error });
              return EMPTY;
            }),
          ),
    );
  }

  rm(...keys: any[]) {
    return this.ps.monitor(() =>
      isEmpty(keys)
        ? undefined
        : from(keys).pipe(
            mergeMap(
              (key) =>
                new Observable<void>((obs) => {
                  (async () => {
                    try {
                      const d = doc(
                        firestore,
                        this.collectionPath,
                        this.collectionGroup,
                        this.collectionName,
                        key,
                      );
                      if ((await getDoc(d)).exists()) {
                        await deleteDoc(d);
                      }
                      obs.next();
                      obs.complete();
                    } catch (error) {
                      obs.error(error);
                    }
                  })();
                }),
              CONCURRENCY,
            ),

            // wait, discard all
            toArray(),
            ignoreElements(),

            // emit empty
            endWith(void 0),

            catchError((error) => {
              onDebug({ "docs:fireabse:rm": error });
              return EMPTY;
            }),
          ),
    );
  }

  async count() {
    return this.data$.getValue().length;
  }

  async pull() {}

  override init() {
    this.unsubscribe?.();
    this.unsubscribe = onSnapshot(this.coll, (snapshot) => {
      this.data$.next(
        snapshot.docs.map((node) => ({ ...node.data(), id: node.id })),
      );
    });
  }

  override destroy() {
    this.unsubscribe?.();
  }
}

// utils
function withoutId(node: any) {
  return omit(node, ["id"]);
}
