import Echo from "laravel-echo";
import Pusher from "pusher-js";

import { useAuth } from "~/stores/use-auth.store";
import type { TOrNoValue } from "~/types";

export default defineNuxtPlugin(() => {
  const { reverb } = useRuntimeConfig().public.broadcasting;
  const auth = useAuth();

  const echo = shallowRef<TOrNoValue<Echo<"reverb">>>();

  watch(
    () => auth.token,
    (token) => {
      // teardown previous connection
      if (echo.value) {
        try {
          echo.value.disconnect();
        } catch (error) {
          // pass
        }
        echo.value = null;
      }

      if (!token) return;

      echo.value = new Echo({
        client: Pusher,
        broadcaster: "reverb",
        key: reverb.key,
        scheme: reverb.scheme,
        wsHost: reverb.host,
        wsPort: reverb.port,
        wssPort: reverb.port,
        forceTLS: true,
        enabledTransports: ["ws", "wss"],
        authEndpoint: reverb.authEndpoint,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    },
    { immediate: true },
  );

  return {
    provide: {
      echo,
    },
  };
});
