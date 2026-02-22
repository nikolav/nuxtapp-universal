import type { TWatchDep } from "~/types";

type TUsePendingDeps<T = unknown> = Record<string, TWatchDep<T>>;

export const usePending = <T = unknown>() => {
  const { $$ } = useNuxtApp();
  const deps = ref(<TUsePendingDeps<T>>{});

  const pending = computed(() =>
    $$.some(deps.value, (dep) => Boolean(toValue(dep))),
  );

  const track = (addDeps: TUsePendingDeps<T>) => {
    $$.copy(deps.value, addDeps);
  };

  const ignore = (...keys: string[]) => {
    deps.value = $$.omit(deps.value, keys);
  };

  const reset = () => {
    deps.value = <TUsePendingDeps<T>>{};
  };

  return { pending, track, ignore, reset };
};
