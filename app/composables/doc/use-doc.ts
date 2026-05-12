import { tryOnScopeDispose } from "@vueuse/shared";

import type { TRecordJson, TUseCacheKeyDriver } from "~/types";
import type { CacheByKeyBase } from "~/services/doc/base";
import { schemaNonSpecialChars } from "~/schemas";
import { CacheByKeyDriverApi } from "~/services/doc/driver-api";
import { CacheByKeyDriverFirebase } from "~/services/doc/driver-firebase";
import { CacheByKeyDriverLocal } from "~/services/doc/local";
import { useProcessMonitor } from "~/composables/utils/use-process-monitor";
import { useComputed$ } from "~/composables/utils/use-computed-obs";
import { useAppConfigItem } from "~/composables/utils/use-app-config-item";
import { useAuth } from "~/stores/use-auth.store";

export const useDoc = (key: string) => {
  const ps = useProcessMonitor();
  const CACHE = useAppConfigItem("keys.CACHE_BY_KEY");
  const service: CacheByKeyBase = {
    local: (key: string) =>
      CacheByKeyDriverLocal.single(ps, `${CACHE.value}:${key}`),
    firebase: (key: string) =>
      new CacheByKeyDriverFirebase(ps, CACHE.value!, key),
    api: (key: string) =>
      new CacheByKeyDriverApi(
        // track request state
        ps,
        // composed key
        `${CACHE.value}:${key}`,
        // api client --gql
        useNuxtApp().$gql,
        // access token getter
        () => useAuth().token,
      ),
  }[<TUseCacheKeyDriver>useRuntimeConfig().public.cacheKeyDriver](
    schemaNonSpecialChars.parse(key),
  );

  const data = useComputed$<TRecordJson>(service.data$, {});

  const destroy = async () => {
    await useNuxtApp().$$.resolved(service.destroy(), false);
  };
  tryOnScopeDispose(destroy);

  return {
    ps,
    data,
    start: service.init.bind(service),
    commit: service.push.bind(service),
    rm: service.drop.bind(service),
    pull: service.pull.bind(service),
    destroy,
  };
};
