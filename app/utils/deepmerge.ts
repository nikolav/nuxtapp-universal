import mergeWith from "lodash/mergeWith";
import isArray from "lodash/isArray";

import type { TRecordJson } from "../types";

interface IArrayMergeStrategy {
  arrayMergeStrategyConcat?: boolean;
}

// overwrite 1st, default
export const deepmerge =
  <T = TRecordJson>(
    config: IArrayMergeStrategy = {
      arrayMergeStrategyConcat: false,
    },
  ) =>
  (target: T, ...sources: T[]) =>
    mergeWith(target, ...sources, (obj: T, src: T) =>
      !config.arrayMergeStrategyConcat
        ? undefined
        : isArray(obj)
          ? obj.concat(src)
          : undefined,
    );
