import { BehaviorSubject, Subject } from "rxjs";

import type { IEventApp, TRecordJson } from "~/types";
import { TOKEN_appEmitter$, TOKEN_appState$ } from "~/keys";

export default defineNuxtPlugin({
  name: "emitters",
  enforce: "pre",
  setup: (nuxtapp) => {
    const emitter$ = new Subject<IEventApp>();
    const state$ = new BehaviorSubject<TRecordJson>({});

    nuxtapp.vueApp.provide(TOKEN_appEmitter$, emitter$);
    nuxtapp.vueApp.provide(TOKEN_appState$, state$);
  },
});
