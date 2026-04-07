import { useStoreFlags } from "~/stores/use-flags.store";

export const useDrawerMain = () => {
  const DRAWER_MAIN = "DRAWER_MAIN:47203d0b-ea0d-592f-98d3-4608f22384a0";
  const $flags = useStoreFlags();
  const isActive = computed({
    get: () => $flags.item(DRAWER_MAIN),
    set: (val) => {
      $flags.push({ [DRAWER_MAIN]: val });
    },
  });
  return {
    isActive,
    toggle: () => $flags.toggle(DRAWER_MAIN),
    on: () => $flags.on(DRAWER_MAIN),
    off: () => $flags.off(DRAWER_MAIN),
  };
};
