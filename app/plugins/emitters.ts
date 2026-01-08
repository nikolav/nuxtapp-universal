import { Subject } from "rxjs";

import type { IEventApp } from "~/types";
import { TOKEN_appEmitter$ } from "~/keys";

export default defineNuxtPlugin((nuxtapp) => {
  nuxtapp.vueApp.provide(TOKEN_appEmitter$, new Subject<IEventApp>());
});
