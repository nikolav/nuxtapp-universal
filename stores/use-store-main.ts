export const useStoreMain = defineStore("store:main", () => {
  const cache = ref<any>({ "x:1": "foo" });

  // @
  return {
    cache,
  };
});
