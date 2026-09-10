import type { WatchOptions as TWatchOptions } from "vue";
import type { TMaybeAsync, TWatchDep } from "~/types";

export const useAllPass = <T = unknown>(
  deps: TWatchDep<T>[],
  test: (x: T) => boolean,
  callback: () => TMaybeAsync<void>,
  options?: TWatchOptions,
) => {
  const { $$ } = useNuxtApp();

  const cancel = watch(
    () => deps.map(toValue),
    async (values) => {
      if (!values.every(test)) return;
      await $$.resolved(callback(), false);
    },
    options,
  );

  return { cancel };
};
