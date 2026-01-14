import { defer, from, Observable } from "rxjs";
import { mergeMap, shareReplay } from "rxjs/operators";

import type { TCashDomClient } from "~/types";

export default defineNuxtPlugin({
  name: "cashdom",
  setup: () => {
    if (import.meta.server) return;
    return {
      provide: {
        dom$: defer(() =>
          from(import("cash-dom")).pipe(
            mergeMap(
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
    };
  },
});
