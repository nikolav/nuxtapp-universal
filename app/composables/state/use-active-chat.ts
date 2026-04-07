import type { TOrNoValue } from "~/types";
import { useStoreMain } from "~/stores/use-store-main.store";
import { useAppConfigItem } from "~/composables/utils/use-app-config-item";

export const useActiveChat = <T = string>() => {
  const $main = useStoreMain();

  const current = computed({
    get: () =>
      <TOrNoValue<T>>(
        $main.item(useAppConfigItem<string>("keys.CHAT_ACTIVE").value!)
      ),
    set: (val) =>
      $main.push({
        [useAppConfigItem<string>("keys.CHAT_ACTIVE").value!]: val ?? null,
      }),
  });
  const isActive = computed(() => null != current.value);
  const clear = () => {
    current.value = null;
  };

  return { current, isActive, clear };
};
