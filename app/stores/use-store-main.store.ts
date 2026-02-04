export const useStoreMain = defineStore("store:main", () => {
  const { $$ } = useNuxtApp();

  // @store
  const cache = ref(<any>{});
  const item = (path: string) => $$.get(cache.value, path);
  const push = (patch: Record<string, any>) => {
    $$.each(patch, (value, path) => {
      $$.set(cache.value, path, value);
    });
  };
  const drop = (...paths: string[]) => {
    $$.each(paths, (path) => {
      $$.unset(cache.value, path);
    });
  };
  const isSet = (path: string) => $$.hasPath(cache.value, path);
  return {
    store: readonly(cache),
    item,
    push,
    drop,
    isSet,
  };
});
