import { Subject } from "rxjs";

import type { IEventApp } from "~/types";
import { TOKEN_appEmitter$ } from "~/keys";

export default defineNuxtPlugin({
  name: "emitters",
  enforce: "pre",
  setup: (nuxtapp) => {
    const emitter$ = new Subject<IEventApp>();
    nuxtapp.vueApp.provide(TOKEN_appEmitter$, emitter$);
  },
});
