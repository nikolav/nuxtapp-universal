import type { TOrNoValue } from "#server/types";

export const isPresent = <T>(v: TOrNoValue<T>): v is T => null != v;
