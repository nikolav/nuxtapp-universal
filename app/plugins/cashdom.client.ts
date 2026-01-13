import { defer, from, Observable } from "rxjs";
import { shareReplay, switchMap } from "rxjs/operators";

import type { TCashDomClient } from "~/types";

export default defineNuxtPlugin(() => ({
  provide: {
    dom$: defer(() =>
      from(import("cash-dom")).pipe(
        switchMap(
          ({ default: $ }) =>
            new Observable<TCashDomClient>((observer) => {
              if (import.meta.server) {
                observer.complete();
                return;
              }

              $(() => {
                observer.next($);
                observer.complete();
              });
            })
        )
      )
    ).pipe(
      shareReplay({
        bufferSize: 1,
        refCount: false,
      })
    ),
  },
}));
