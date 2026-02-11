import mergeWith from "lodash/mergeWith";
import isArray from "lodash/isArray";
import type { TRecordJson, TOrNoValue } from "../types";

interface IArrayMergeStrategy {
  arrayMergeStrategyConcat: boolean;
}

export const deepmerge =
  <T = TRecordJson>(
    config: IArrayMergeStrategy = {
      arrayMergeStrategyConcat: false,
    },
  ) =>
  (...sources: T[]) =>
    mergeWith(<T>{}, ...sources, (obj: T, src: T) =>
      !config.arrayMergeStrategyConcat
        ? undefined
        : isArray(obj)
          ? obj.concat(src)
          : undefined,
    );
