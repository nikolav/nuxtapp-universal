import { configItem } from "~/utils/config-item";

export const useConfigItem = <T = string>(path: string) =>
  computed(() => <T>configItem(path));
