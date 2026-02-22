import { toRef } from "vue";
import type { WatchOptions } from "vue";
import { defer, from, isObservable } from "rxjs";
import type { Observable } from "rxjs";
import { from as vufrom } from "@vueuse/rxjs";
import isFunction from "lodash/isFunction";

import type { TMaybeAsync } from "~/types";

const isPromiseLike = <T = unknown>(x: any): x is PromiseLike<T> =>
  isFunction(Object(x).then);

export const to$ = <T = unknown>(
  input: TMaybeAsync<T>,
  watchOptins: WatchOptions = { immediate: true },
) =>
  defer(() => {
    // Observable
    if (isObservable(input)) return input;
    // Promise / PromiseLike
    if (isPromiseLike<T>(input)) return from(input);
    // else Vue reactivity|getter
    return <Observable<T>>vufrom(toRef<T>(input), watchOptins);
  });
