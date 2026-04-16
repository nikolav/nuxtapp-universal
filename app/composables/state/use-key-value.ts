import type { TOrNoValue } from "~/types";

export const useKeyValue = <TValue = unknown>() => {
  const { $$ } = useNuxtApp();

  const values = ref<Record<string, TValue>>({});
  const currentKey = shallowRef<TOrNoValue<string>>();

  const current = computed(() =>
    null != currentKey.value ? values.value[currentKey.value] : undefined,
  );

  const keys = computed(() => $$.keys(values.value));

  const commit = (patch: Record<string, TValue>) => {
    $$.copy(values.value, patch);
  };

  const use = (key: string) => {
    currentKey.value = key;
  };

  const clear = () => {
    currentKey.value = undefined;
  };

  return {
    current,
    keys,
    commit,
    use,
    clear,
  };
};
