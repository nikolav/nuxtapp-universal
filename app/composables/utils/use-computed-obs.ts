import { onScopeDispose } from "vue";
import type { Subscription } from "rxjs";

import { to$ } from "~/utils/to-obs";
import type { TOrNoValue, TMaybeAsync } from "~/types";

export const useComputed$ = <T = unknown>(
  source: TMaybeAsync<T>,
  initial: T,
) => {
  const current = ref(initial);

  let sub: TOrNoValue<Subscription>;

  if (import.meta.client) {
    sub = to$(source).subscribe((val) => {
      current.value = val;
    });
  }

  const destroy = () => {
    sub?.unsubscribe();
  };
  onScopeDispose(destroy);

  return computed<T>(() => current.value);
};
