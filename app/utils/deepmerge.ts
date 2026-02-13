import mergeWith from "lodash/mergeWith";
import isArray from "lodash/isArray";
import type { TRecordJson, TOrNoValue } from "../types";

interface IArrayMergeStrategy {
  arrayMergeStrategyConcat?: boolean;
  overwrite1st?: boolean;
}

export const deepmerge =
  <T = TRecordJson>(
    config: IArrayMergeStrategy = {
      arrayMergeStrategyConcat: false,
    },
  ) =>
  (node: T, ...sources: T[]) => {
    const target = config.overwrite1st ? node : <T>{};
    const other = config.overwrite1st ? sources : [node, ...sources];
    return mergeWith(target, ...other, (obj: T, src: T) =>
      !config.arrayMergeStrategyConcat
        ? undefined
        : isArray(obj)
          ? obj.concat(src)
          : undefined,
    );
  };
