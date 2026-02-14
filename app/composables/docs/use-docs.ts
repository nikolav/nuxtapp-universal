import type { TUseDocsKeyDriver } from "~/types";
import type { CollectionsBase } from "~/services/docs/base";
import { CollectionsDriverMemory } from "~/services/docs/driver-memory";
import { CollectionsDriverApi } from "~/services/docs/driver-api";
import { useComputed$ } from "~/composables/utils/use-computed-obs";
import { useProcessMonitor } from "~/composables/utils/use-process-monitor";
import { useAuth } from "~/stores/use-auth.store";

export const useDocs = (collectionName: string) => {
  const ps = useProcessMonitor();
  const service: CollectionsBase = {
    local: () => CollectionsDriverMemory.single(collectionName),
    api: () =>
      new CollectionsDriverApi(
        ps,
        collectionName,
        useNuxtApp().$gql,
        () => useAuth().token,
      ),
  }[<TUseDocsKeyDriver>useRuntimeConfig().public.collectionsKeyDriver]();

  const data = useComputed$(service.data$, []);

  const destroy = async () => {
    await service.destroy();
  };
  onScopeDispose(destroy);

  return {
    ps,
    data,
    commit: service.commit.bind(service),
    rm: service.rm.bind(service),
    pull: service.pull.bind(service),
    start: service.init.bind(service),
    destroy,
  };
};
