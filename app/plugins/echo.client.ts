import Echo from "laravel-echo";
import Pusher from "pusher-js";
import type { TOrNoValue } from "~/types";

export default defineNuxtPlugin({
  name: "echo",
  dependsOn: ["use-platform"],
  setup: (_nuxtApp) => {
    let echo = shallowRef<TOrNoValue<Echo<"reverb">>>(null);
    useNuxtApp().$window$.subscribe((window) => {
      const { reverb } = useRuntimeConfig().public.broadcasting;
      (<any>window).Pusher = Pusher;
      echo.value = new Echo({
        broadcaster: "reverb",
        key: reverb.key,
        scheme: reverb.scheme,
        wsHost: reverb.host,
        wsPort: reverb.port,
        wssPort: reverb.port,
        forceTLS: true,
        enabledTransports: ["ws", "wss"],
        // private/presence auth
        authEndpoint: reverb.authEndpoint,
        auth: {
          headers: {
            // @@TODO
            Authorization: `Bearer ${"TOKEN"}`,
          },
        },
        // withCredentials: false,
      });
    });

    return {
      provide: {
        echo,
      },
    };
  },
});
