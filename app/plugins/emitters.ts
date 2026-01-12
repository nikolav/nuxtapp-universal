import { Subject } from "rxjs";

import { TOKEN_appEmitter$ } from "~/keys";
import type { IEventApp } from "~/types";

export default defineNuxtPlugin((nuxtapp) => {
  const emitter$ = new Subject<IEventApp>();
  nuxtapp.vueApp.provide(TOKEN_appEmitter$, emitter$);

  // stream NotificationPermission:granted
  onNuxtReady(async () => {
    // "default" | "denied" | "granted";
    const p = await Notification.requestPermission();
    if ("granted" === p) {
      emitter$.next(<IEventApp<NotificationPermission>>{
        type: useAppConfig().events.EVENT_notifications_granted,
        payload: p,
      });
    }
  });
});
