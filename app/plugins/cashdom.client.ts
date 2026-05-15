import { defer, EMPTY, Observable } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import type { TCashDomClient } from "~/types";
import { single$ } from "~/utils/to-value-obs";
import { onDebug } from "~/utils/on-debug";

export default defineNuxtPlugin({
  name: "cashdom",
  dependsOn: ["use-platform"],
  setup: () => {
    const dom: Observable<{ $: TCashDomClient }> = single$(
      useNuxtApp().$window$.pipe(
        switchMap(() =>
          defer(() => import("cash-dom")).pipe(
            switchMap(
              ({ default: $ }) =>
                new Observable<{ $: TCashDomClient }>((obs) => {
                  if (import.meta.server) {
                    obs.complete();
                    return;
                  }
                  $(() => {
                    obs.next({ $ });
                    obs.complete();
                  });
                }),
            ),
          ),
        ),
        catchError((error) => {
          onDebug({ "cash-dom:init:error": error });
          return EMPTY;
        }),
      ),
    );

    return {
      provide: {
        dom,
      },
    };
  },
});
