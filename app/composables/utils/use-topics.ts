export const useTopics = () => {
  const { keys } = useAppConfig();
  return {
    collectionsTag: (collectionName: any) =>
      collectionName ? `${keys.COLLECTIONS_NAME_PREFIX}${collectionName}` : "",
  };
};
