import { EMPTY, of, shareReplay } from "rxjs";
import type { Observable } from "rxjs";

import { single$ } from "~/utils/to-value-obs";

export default defineNuxtPlugin({
  name: "use-platform",
  setup: () => {
    const isBrowser = import.meta.client;

    const platformBrowser$: Observable<void> = (
      isBrowser ? of(void 0) : EMPTY
    ).pipe(shareReplay({ bufferSize: 1, refCount: false }));

    const win = isBrowser ? globalThis.window : undefined;
    const window$: Observable<Window> = single$(win ? of(win) : EMPTY);

    return {
      provide: {
        platformBrowser$,
        window$,
      },
    };
  },
});
