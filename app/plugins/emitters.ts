import { Subject } from "rxjs";

import { TOKEN_appEmitter$ } from "~/keys";
import type { IEventApp } from "~/types";

export default defineNuxtPlugin({
  name: "emitters",
  setup: (nuxtapp) => {
    const emitter$ = new Subject<IEventApp>();
    nuxtapp.vueApp.provide(TOKEN_appEmitter$, emitter$);
  },
});
