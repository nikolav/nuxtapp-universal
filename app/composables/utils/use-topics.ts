export const useTopics = () => ({
  collectionsTag: (collectionName: any) =>
    collectionName
      ? `${useNuxtApp().$$.config("keys.COLLECTIONS_NAME_PREFIX")}${collectionName}`
      : "",
});
