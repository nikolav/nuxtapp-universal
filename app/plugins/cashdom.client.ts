import { from, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

import { value$$ } from "~/utils/to-value-obs";
import type { TCashDomClient } from "~/types";

export default defineNuxtPlugin({
  name: "cashdom",
  dependsOn: ["use-platform"],
  setup: () => {
    const dom: Observable<TCashDomClient> = value$$(
      useNuxtApp().$window$.pipe(
        switchMap(() =>
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
                }),
            ),
          ),
        ),
      ),
    );

    return {
      provide: {
        dom,
      },
    };
  },
});
