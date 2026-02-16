import { usePending } from "~/composables/utils/use-pending";

export const useStoreAppProcessing = defineStore("app:processing", () => ({
  ...usePending(),
}));
