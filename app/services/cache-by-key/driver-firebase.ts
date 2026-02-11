import { BehaviorSubject, EMPTY, Observable, switchMap, tap } from "rxjs";
import isEmpty from "lodash/isEmpty";
import reduce_ from "lodash/reduce";

import {
  deleteField,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  type DocumentReference,
} from "firebase/firestore";

import { firestore } from "~/config/firebase";
import { CacheByKeyBase } from "./base";
import type { TMaybeAsync, TRecordJson } from "~/types";
import { resolved } from "~/utils/resolved";
import { snapshot } from "node:test";

export interface ICacheByKeyOptions {
  /** time-to-live in milliseconds */
  ttlMs?: number;
}

export class CacheByKeyDriverFirebase extends CacheByKeyBase {
  // data stream for key
  data$ = new BehaviorSubject(<TRecordJson>{});

  private doc: DocumentReference;

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
    new Observable((obs) => {
      (async () => {
        //
      })();
    });
  }
  // destroy() {}
}

// --utils
function withTimestamp(node: any) {
  return {
    ...node,
    "@": serverTimestamp(),
  };
}
