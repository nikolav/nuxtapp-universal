import type { TOrNoValue } from "~/types";

export const isPresent = <T>(v: TOrNoValue<T>): v is T => null != v;
