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
    switch (true) {
      case isObservable(input):
        // Observable
        return input;
        break;

      case isPromiseLike<T>(input):
        // PromiseLike
        return from(input);
        break;

      default:
        // Vue reactivity|getter
        return <Observable<T>>vufrom(toRef<T>(input), watchOptins);
        break;
    }
  });
