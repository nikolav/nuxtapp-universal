import { BehaviorSubject } from "rxjs";

import type { TRecordJson } from "~/types";
import { TOKEN_appState$, TOKEN_foo } from "~/keys";

export default defineNuxtPlugin({
  name: "providers",
  enforce: "pre",
  setup: (nuxtapp) => {
    nuxtapp.vueApp.provide(TOKEN_foo, "foo");

    const state$ = new BehaviorSubject<TRecordJson>({});
    nuxtapp.vueApp.provide(TOKEN_appState$, state$);
  },
});
