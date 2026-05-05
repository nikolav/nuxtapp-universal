import type { TOrNoValue } from "~/types";

export const useConfigItem = <T = string>(
  path: TOrNoValue<string>,
  DEFAULT_NOT_FOUND = undefined,
) =>
  <T>(
    (path
      ? useNuxtApp().$$.get(
          useRuntimeConfig(),
          path,
          useNuxtApp().$$.get(useAppConfig(), path, DEFAULT_NOT_FOUND),
        )
      : undefined)
  );
