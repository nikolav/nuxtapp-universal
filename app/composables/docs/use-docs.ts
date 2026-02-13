import type { TUseDocsKeyDriver } from "~/types";
import { useComputed$ } from "~/composables/utils/use-computed-obs";
import { useProcessMonitor } from "~/composables/utils/use-process-monitor";
import type { CollectionsBase } from "~/services/docs/base";
import { CollectionsDriverMemory } from "~/services/docs/driver-memory";

export const useDocs = (collectionName: string) => {
  const ps = useProcessMonitor();
  const service: CollectionsBase = {
    local: () => CollectionsDriverMemory.single(collectionName),
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
