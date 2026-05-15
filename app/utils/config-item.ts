import get from "lodash/get";

import type { TOrNoValue } from "~/types";

export const configItem = <T = string>(path: string) =>
  <TOrNoValue<T>>get(useRuntimeConfig(), path, get(useAppConfig(), path));
