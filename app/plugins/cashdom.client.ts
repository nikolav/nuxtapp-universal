import { from, Observable } from "rxjs";
import { mergeMap, shareReplay } from "rxjs/operators";

import type { TCashDomClient } from "~/types";

export default defineNuxtPlugin({
  name: "cashdom",
  setup: () => ({
    provide: {
      dom$: from(import("cash-dom")).pipe(
        mergeMap(
          ({ default: $ }) =>
            new Observable<TCashDomClient>((obs) => {
              $(() => {
                obs.next($);
                obs.complete();
              });
            })
        ),
        shareReplay({
          bufferSize: 1,
          refCount: false,
        })
      ),
    },
  }),
});
