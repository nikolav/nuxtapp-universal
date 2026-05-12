import { tryOnScopeDispose } from "@vueuse/shared";

import type { TUseDocsKeyDriver } from "~/types";
import type { CollectionsBase } from "~/services/docs/base";
import { schemaNonSpecialChars } from "~/schemas";
import { CollectionsDriverMemory } from "~/services/docs/driver-memory";
import { CollectionsDriverApi } from "~/services/docs/driver-api";
import { CollectionsFirebase } from "~/services/docs/driver-firebase";
import { useComputed$ } from "~/composables/utils/use-computed-obs";
import { useProcessMonitor } from "~/composables/utils/use-process-monitor";
import { useTopics } from "~/composables/utils/use-topics";
import { useAuth } from "~/stores/use-auth.store";

export const useDocs = (
  collectionName: string,
  collectionGroup = "_default",
) => {
  const ps = useProcessMonitor();
  const service: CollectionsBase = {
    local: (collectionGroup: string, collectionName: string) =>
      CollectionsDriverMemory.single(
        useTopics().collectionsTag(`${collectionGroup}:${collectionName}`),
      ),
    api: (collectionGroup: string, collectionName: string) =>
      new CollectionsDriverApi(
        ps,
        useTopics().collectionsTag(`${collectionGroup}:${collectionName}`),
        useNuxtApp().$gql,
        () => useAuth().token,
      ),
    firebase: (collectionGroup: string, collectionName: string) =>
      new CollectionsFirebase(
        ps,
        useAppConfig().services.firebase.COLLECTIONS_PATH,
        collectionGroup,
        collectionName,
      ),
  }[<TUseDocsKeyDriver>useRuntimeConfig().public.collectionsKeyDriver](
    schemaNonSpecialChars.parse(collectionGroup),
    schemaNonSpecialChars.parse(collectionName),
  );

  const data = useComputed$(service.data$, []);

  const destroy = async () => {
    await useNuxtApp().$$.resolved(service.destroy(), false);
  };
  tryOnScopeDispose(destroy);

  return {
    ps,
    data,
    commit: service.commit.bind(service),
    rm: service.rm.bind(service),
    pull: service.pull.bind(service),
    count: service.count.bind(service),
    start: service.init.bind(service),
    destroy,
  };
};
