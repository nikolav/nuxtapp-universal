import type { TOrNoValue } from "~/types";

export const useAppConfigItem = <T = string>(path: string) =>
  computed(() => <TOrNoValue<T>>useNuxtApp().$$.get(useAppConfig(), path));
