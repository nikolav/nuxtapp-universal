import get from "lodash/get";

import type { TOrNoValue } from "../types";
import { isPresent } from "./is-present";

export const configItem = <T = unknown>(path: string, DEFAULT?: T) => {
  let value: TOrNoValue<T>;
  for (
    let configs = [() => useRuntimeConfig(), () => useAppConfig()],
      i = 0,
      len = configs.length;
    i < len && !isPresent(value);
    value = <TOrNoValue<T>>get(configs[i++]!(), path)
  );

  return value ?? DEFAULT;
};
