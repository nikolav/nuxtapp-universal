import mergeWith from "lodash/mergeWith";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";

import type {
  TRecordJson,
  IDeepMergeOptions,
  TDeepmergeArrayMergeStrategy,
} from "../types";

export const deepmerge = Object.assign(
  <T extends TRecordJson = TRecordJson>(options?: IDeepMergeOptions) =>
    (target: T, ...sources: T[]): T =>
      mergeWith(target, ...sources, (value: T, srcValue: T) =>
        isArray(value) && isArray(srcValue)
          ? (
              options?.arrayMergeStrategy ??
              <TDeepmergeArrayMergeStrategy<T>>deepmerge.concat
            )(value, srcValue)
          : undefined,
      ),
  {
    concat: <T = unknown>(a1: T[], a2: T[]) => a1.concat(a2),
    replace: <T = unknown>(_a1: T[], a2: T[]) => a2,
    replaceNonempty: <T = unknown>(a1: T[], a2: T[]) => (isEmpty(a2) ? a1 : a2),
    unique: <T = unknown>(a1: T[], a2: T[]) => [...new Set([...a1, ...a2])],
  },
);
