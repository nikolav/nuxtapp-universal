import { from, of, isObservable } from "rxjs";
import type { TMaybeAsync } from "~/types";

export const to$ = <T = unknown>(v: TMaybeAsync<T>) => {
  if (isObservable(v)) return v;
  if (v instanceof Promise) return from(v);
  return of(v);
};
