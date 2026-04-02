import type { TMaybeAsync, TOrNoValue } from "~/types";

export const useProcessMonitor = () => {
  const { $$ } = useNuxtApp();

  const processing = ref<TOrNoValue<boolean>>(null);
  const error = shallowRef<any>(null);
  const success = ref<TOrNoValue<boolean>>(null);

  // sync with external state, useAsyncData .pending .error, etc.
  const external = shallowRef({
    pending: ref<TOrNoValue<boolean>>(null),
    error: shallowRef<any>(null),
  });

  const begin = (callback: any = $$.noop) => {
    error.value = null;
    success.value = false;
    processing.value = true;
    callback();
  };

  const setError = (err: any) => {
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

  // handle status flags for fn that resolves a value, or throws
  const exec = async <T = unknown>(
    fn: () => TMaybeAsync<T>,
    present = false,
  ) => {
    begin();
    try {
      return await $$.resolved<T>(fn(), present);
    } catch (e) {
      setError(e);
    } finally {
      done();
      if (!error.value) successful();
    }
  };

  // sync with external
  const sync = (pending: Ref<TOrNoValue<boolean>>, error: Ref<any>) => {
    external.value = { pending, error };
  };

  // map external to ps
  watch(
    () => [external.value.pending, external.value.error] as const,
    ([pending, error_]) => {
      setError(error_);

      if (pending) {
        if (!processing.value) begin();
        return;
      }

      done();

      if (!processing.value && !error.value) successful();
    },
  );

  return {
    // status
    processing,
    error,
    success,

    // phases
    begin,
    setError,
    successful,
    done,

    // sync with external status
    sync,

    // watch async action
    monitor: exec,
    exec,
  };
};
