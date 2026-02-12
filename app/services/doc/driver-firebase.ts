import { BehaviorSubject, EMPTY, Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import isEmpty from "lodash/isEmpty";
import reduce_ from "lodash/reduce";
import {
  deleteField,
  doc,
  DocumentSnapshot,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { DocumentReference, Unsubscribe } from "firebase/firestore";

import { CacheByKeyBase } from "./base";
import { firestore } from "~/config/firebase";
import { ManageSubscriptionsService } from "~/services/manage-subscriptions";
import { onDebug } from "~/utils/on-debug";
import type {
  TOrNoValue,
  TRecordJson,
  TUseProcessMonitorReturnType,
} from "~/types";

export class CacheByKeyDriverFirebase extends CacheByKeyBase {
  data$ = new BehaviorSubject(<TRecordJson>{});

  private doc: DocumentReference;
  private subs = new ManageSubscriptionsService();
  private data_s: TOrNoValue<Unsubscribe>;

  constructor(
    private ps: TUseProcessMonitorReturnType,
    private cacheName: string,
    private key: string,
  ) {
    super();
    this.doc = doc(firestore, this.cacheName, this.key);
  }

  // batch set keys,
  async push(patch: TRecordJson) {
    if (isEmpty(patch)) return;
    await this.ps.monitor(() =>
      setDoc(this.doc, withTimestamp(patch), {
        merge: true,
      }),
    );
  }

  // drop keys
  async drop(...paths: string[]) {
    if (isEmpty(paths)) return;
    await this.ps.monitor(() =>
      updateDoc(
        this.doc,
        reduce_(
          paths,
          (res, path) => {
            res[path] = deleteField();
            return res;
          },
          withTimestamp(<any>{}),
        ),
      ),
    );
  }

  override init() {
    this.subs.push({
      data: new Observable<DocumentSnapshot>((obs) => {
        this.data_s = onSnapshot(
          this.doc,
          (snapshot) => {
            obs.next(snapshot);
          },
          (error) => {
            obs.error(error);
          },
        );
      })
        .pipe(
          switchMap((snapshot) =>
            snapshot.exists()
              ? of(<TRecordJson>{ ...snapshot.data(), id: snapshot.id })
              : new Observable<TRecordJson>((obs) => {
                  (async (newd) => {
                    try {
                      await setDoc(this.doc, newd);
                      obs.next({ ...newd, id: this.key });
                    } catch (error) {
                      obs.error(error);
                    }
                  })(withTimestamp(<TRecordJson>{}));
                }),
          ),
          catchError((error) => {
            onDebug({ "cache-by-key:init:firebase": error });
            return EMPTY;
          }),
        )
        .subscribe((d) => {
          this.data$.next(d);
        }),
    });
  }

  override async pull() {}

  override destroy() {
    // close onSnapshot
    this.data_s?.();
    // unsubscribe data
    this.subs.destroy();
  }
}

// --utils
function withTimestamp(node: any) {
  return {
    ...node,
    "@": serverTimestamp(),
  };
}
