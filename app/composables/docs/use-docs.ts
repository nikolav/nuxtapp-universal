import { tryOnScopeDispose } from "@vueuse/shared";

import type { TUseDocsKeyDriver } from "~/types";
import type { CollectionsBase } from "~/services/docs/base";
import { schemaNonSpecialChars } from "~/schemas";
import { CollectionsDriverMemory } from "~/services/docs/driver-memory";
import { CollectionsDriverApi } from "~/services/docs/driver-api";
import { useComputed$ } from "~/composables/utils/use-computed-obs";
import { useProcessMonitor } from "~/composables/utils/use-process-monitor";
import { useTopics } from "~/composables/utils/use-topics";
import { useAuth } from "~/stores/use-auth.store";

export const useDocs = (collectionName: string) => {
  const ps = useProcessMonitor();
  const collectionTag = useTopics().collectionsTag(
    schemaNonSpecialChars.parse(collectionName),
  );
  const service: CollectionsBase = {
    local: () => CollectionsDriverMemory.single(collectionTag),
    api: () =>
      new CollectionsDriverApi(
        ps,
        collectionTag,
        useNuxtApp().$gql,
        () => useAuth().token,
      ),
  }[<TUseDocsKeyDriver>useRuntimeConfig().public.collectionsKeyDriver]();

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
