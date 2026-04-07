import type { TOrNoValue } from "~/types";

export const useAppConfigItem = <T = unknown>(path: string) => {
  const { $$ } = useNuxtApp();
  return computed(() => <TOrNoValue<T>>$$.get(useAppConfig(), path));
};
