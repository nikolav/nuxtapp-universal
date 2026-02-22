import { defer, from, isObservable, of } from "rxjs";
import type { TMaybeAsync } from "~/types";

const isPromiseLike = <T = unknown>(x: any): x is Promise<T> =>
  !!x && "function" === typeof x.then;

export const to$ = <T = unknown>(v: TMaybeAsync<T>) =>
  defer(() => (isObservable(v) ? v : isPromiseLike<T>(v) ? from(v) : of(v)));
