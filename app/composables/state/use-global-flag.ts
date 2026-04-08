import { useStoreFlags } from "~/stores/use-flags.store";

export const useGlobalFlag = (NAME: string, DEFAULT: boolean = false) => {
  const $flags = useStoreFlags();
  const isActive = computed({
    get: () => $flags.item(NAME, DEFAULT),
    set: (val) => {
      $flags.push({ [NAME]: val });
    },
  });
  const on = () => {
    $flags.on(NAME);
  };
  const off = () => {
    $flags.off(NAME);
  };
  const toggle = () => {
    $flags.toggle(NAME);
  };
  return {
    isActive,
    on,
    off,
    toggle,
  };
};
