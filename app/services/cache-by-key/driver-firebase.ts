import { BehaviorSubject, EMPTY, Observable, of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
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
import { resolved } from "~/utils/resolved";
import { ManageSubscriptionsService } from "~/services/manage-subscriptions";
import { onDebug } from "~/utils/on-debug";
import type { TOrNoValue, TRecordJson } from "~/types";

const CONCURENCY = 10;
export class CacheByKeyDriverFirebase extends CacheByKeyBase {
  data$ = new BehaviorSubject(<TRecordJson>{});

  private doc: DocumentReference;
  private subs = new ManageSubscriptionsService();
  private data_s: TOrNoValue<Unsubscribe>;

  constructor(private key: string) {
    super();
    this.doc = doc(firestore, "cache", this.key);
  }

  // batch set keys,
  push(patch: TRecordJson) {
    return resolved(
      isEmpty(patch)
        ? EMPTY
        : new Observable<void>((obs) => {
            (async () => {
              await setDoc(this.doc, withTimestamp(patch), {
                merge: true,
              });
              obs.next();
              obs.complete();
            })();
          }),
      false,
    );
  }

  // drop keys
  drop(...paths: string[]) {
    return resolved(
      isEmpty(paths)
        ? EMPTY
        : new Observable<void>((obs) => {
            (async () => {
              await updateDoc(
                this.doc,
                reduce_(
                  paths,
                  (res, path) => {
                    res[path] = deleteField();
                    return res;
                  },
                  withTimestamp(<any>{}),
                ),
              );
              obs.next();
              obs.complete();
            })();
          }),
      false,
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
          mergeMap(
            (snapshot) =>
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
            CONCURENCY,
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
