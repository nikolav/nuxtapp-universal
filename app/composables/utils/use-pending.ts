import type { TWatchDep } from "~/types";

type TUsePendingDeps<T = unknown> = Record<string, TWatchDep<T>>;

export const usePending = <T = unknown>() => {
  const { $$ } = useNuxtApp();
  const deps = ref(<TUsePendingDeps<T>>{});

  const pending = computed(() =>
    $$.some(deps.value, (dep) => Boolean(toValue(dep))),
  );

  const track = (newDeps: TUsePendingDeps<T>) => {
    $$.copy(deps.value, newDeps);
  };

  const ignore = (...keys: string[]) => {
    deps.value = $$.omit(deps.value, keys);
  };

  return { pending, track, ignore };
};
