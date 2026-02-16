import type { TWatchDep } from "~/types";

type TUsePendingDeps = Record<string, TWatchDep>;

export const usePending = () => {
  const { $$ } = useNuxtApp();
  const deps = ref(<TUsePendingDeps>{});

  const pending = computed(() =>
    $$.some(deps.value, (dep) => Boolean(toValue(dep))),
  );

  const track = (newDeps: TUsePendingDeps) => {
    $$.copy(deps.value, newDeps);
  };

  const ignore = (...keys: string[]) => {
    $$.each(keys, (key) => {
      delete deps.value[key];
    });
  };

  return { pending, track, ignore };
};
