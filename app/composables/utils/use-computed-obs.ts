import { onScopeDispose } from "vue";

import type { TMaybeAsync } from "~/types";
import { to$ } from "~/utils/to-obs";
import { ManageSubscriptionsService } from "~/services/manage-subscriptions";

export const useComputed$ = <T = unknown>(
  source: TMaybeAsync<T>,
  initial: T,
) => {
  const current = ref(initial);

  const subs = new ManageSubscriptionsService();

  if (import.meta.client) {
    subs.push({
      current: to$(source).subscribe((val) => {
        current.value = val;
      }),
    });
  }

  const destroy = () => {
    subs.destroy();
  };
  onScopeDispose(destroy);

  return computed<T>(() => current.value);
};
