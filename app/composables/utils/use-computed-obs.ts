import { onScopeDispose } from "vue";
import type { Subscription } from "rxjs";

import type { TOrNoValue, TMaybeAsync } from "~/types";

export const useComputed$ = <T = unknown>(source: TMaybeAsync<T>) => {
  const { $$ } = useNuxtApp();
  const state = ref<TOrNoValue<T>>();

  let sub: TOrNoValue<Subscription>;

  if (import.meta.client) {
    sub = $$.to$(source).subscribe((val) => {
      state.value = val;
    });
  }

  onScopeDispose(() => {
    sub?.unsubscribe();
  });

  return computed(() => state.value);
};
