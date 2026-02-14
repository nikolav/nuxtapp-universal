import mergeWith from "lodash/mergeWith";
import isArray from "lodash/isArray";
import difference from "lodash/difference";

import type { TRecordJson, IDeepMergeOptions } from "../types";

export const deepmerge = Object.assign(
  <T extends TRecordJson = TRecordJson>(
    options: IDeepMergeOptions<T> = { arrayMergeStrategy: deepmerge.replace },
  ) =>
    (target: T, ...sources: T[]): T =>
      mergeWith(target, ...sources, (value: T, srcValue: T) =>
        isArray(value) && isArray(srcValue)
          ? options.arrayMergeStrategy(value, srcValue)
          : undefined,
      ),
  {
    concat: <T>(a1: T[], a2: T[]) => a1.concat(a2),
    concatDifference: <T>(a1: T[], a2: T[]) => a1.concat(difference(a2, a1)),
    replace: <T>(_a1: T[], a2: T[]) => a2,
    replaceNonempty: <T>(a1: T[], a2: T[]) => (0 < a2.length ? a2 : a1),
    unique: <T>(a1: T[], a2: T[]) => [...new Set([...a1, ...a2])],
  },
);
