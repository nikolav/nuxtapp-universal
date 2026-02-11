import type { IStoreFlags } from "~/types";

export const useStoreFlags = defineStore("store:flags", () => {
  const { $$ } = useNuxtApp();

  const data = ref<IStoreFlags>({});

  // batch set dict
  const push = (flags: IStoreFlags) => {
    $$.copy(data.value, flags);
  };

  const on = (name: string) => {
    push({ [name]: true });
  };

  const off = (name: string) => {
    push({ [name]: false });
  };

  const item = (name: string, DEFAULT = false) => {
    return data.value[name] ?? DEFAULT;
  };

  const toggle = (name: string) => {
    push({ [name]: !item(name) });
  };

  const use = (newStore: IStoreFlags) => {
    data.value = newStore;
  };

  return {
    item,
    push,
    on,
    off,
    toggle,
    use,
  };
});
