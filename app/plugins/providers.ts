import { Subject } from "rxjs";

import type { IEventApp } from "~/types";
import { TOKEN_appEmitter$, TOKEN_foo } from "~/keys";

export default defineNuxtPlugin({
  name: "providers",
  enforce: "pre",
  setup: (nuxtapp) => {
    nuxtapp.vueApp.provide(TOKEN_foo, "foo");

    const emitter$ = new Subject<IEventApp>();
    nuxtapp.vueApp.provide(TOKEN_appEmitter$, emitter$);
  },
});
