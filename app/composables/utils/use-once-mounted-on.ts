import once from "lodash/once";

import { resolved } from "~/utils/resolved";
import type { TMaybeAsync, TWatchDep } from "~/types";

export const useOnceMounted = <T = unknown>(
  deps: TWatchDep<T>[],
  callback: () => TMaybeAsync<void>,
  flush?: "pre" | "post" | "sync",
) => {
  const mounted = useMounted();

  const callback1 = once(async () => {
    await resolved(callback(), false);
  });

  const cancel = watch(
    () => [mounted.value, ...deps.map(toValue)],
    async (values) => {
      if (values.every(Boolean)) {
        cancel();
        await callback1();
      }
    },
    { immediate: true, flush },
  );

  return { cancel };
};
