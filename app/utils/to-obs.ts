import { isRef, isReactive, isReadonly } from "vue";
import type { WatchOptions } from "vue";
import { defer, from, isObservable, Observable, of } from "rxjs";
import { from as vufrom } from "@vueuse/rxjs";
import isFunction from "lodash/isFunction";

import type { TMaybeAsync } from "~/types";

const isPromiseLike = <T = unknown>(x: any): x is PromiseLike<T> =>
  isFunction(Object(x).then);

const isVueWatchSourceLike = (v: unknown): v is (() => unknown) | object =>
  isFunction(v) || isRef(v) || isReactive(v) || isReadonly(v);

export const to$ = <T = unknown>(
  input: TMaybeAsync<T>,
  watchOptins: WatchOptions = { immediate: true },
) =>
  defer(() => {
    // Observable
    if (isObservable(input)) return input;
    // Promise / PromiseLike
    if (isPromiseLike<T>(input)) return from(input);
    // Vue reactivity / getter -> Observable (VueUse)
    if (isVueWatchSourceLike(input)) {
      return <Observable<T>>vufrom(<any>input, watchOptins);
    }
    // value
    return of(input);
  });
