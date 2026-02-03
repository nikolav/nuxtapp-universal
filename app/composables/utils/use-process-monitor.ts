import type { TOrNoValue } from "~/types";

export const useProcessMonitor = () => {
  const { $$ } = useNuxtApp();

  const processing = ref<TOrNoValue<boolean>>(null);
  const error = ref<unknown>(null);
  const success = ref<TOrNoValue<boolean>>(null);

  const begin = (callback: any = $$.noop) => {
    error.value = null;
    success.value = false;
    processing.value = true;
    callback();
  };

  const setError = (err: unknown) => {
    error.value = err;
  };

  const successful = (callback: any = $$.noop) => {
    success.value = true;
    callback();
  };

  const done = (callback: any = $$.noop) => {
    processing.value = false;
    callback();
  };

  return {
    // flags
    error,
    processing,
    success,

    // markers
    begin,
    setError,
    successful,
    done,
  };
};
