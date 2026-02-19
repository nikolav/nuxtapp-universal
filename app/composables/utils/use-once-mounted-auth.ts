import type { TMaybeAsync, TWatchDep } from "~/types";
import { useOnceMounted } from "~/composables/utils/use-once-mounted-on";
import { useAuth } from "~/stores/use-auth.store";

export const useOnceMountedAuth = <T = unknown>(
  deps: TWatchDep<T>[],
  callback: () => TMaybeAsync<void>,
  flush?: "pre" | "post" | "sync",
) => useOnceMounted([() => useAuth().isAuth, ...deps], callback, flush);
