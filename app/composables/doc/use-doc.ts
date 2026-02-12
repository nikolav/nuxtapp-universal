import { CacheByKeyDriverLocal } from "~/services/doc/local";
import { CacheByKeyDriverFirebase } from "~/services/doc/driver-firebase";
import { CacheByKeyDriverApi } from "~/services/doc/driver-api";
import { useProcessMonitor } from "~/composables/utils/use-process-monitor";
import { useComputed$ } from "~/composables/utils/use-computed-obs";
import { useAuth } from "~/stores/use-auth.store";
import type { CacheByKeyBase } from "~/services/doc/base";
import type { TRecordJson, TUseCacheKeyDriver } from "~/types";

export const useDoc = (key: string) => {
  const ps = useProcessMonitor();
  const { CACHE_BY_KEY: CACHE } = useAppConfig().keys;
  const service: CacheByKeyBase = {
    local: (key: string) => CacheByKeyDriverLocal.single(ps, `${CACHE}:${key}`),
    firebase: (key: string) => new CacheByKeyDriverFirebase(ps, CACHE, key),
    api: (key: string) =>
      new CacheByKeyDriverApi(
        // track request state
        ps,
        // composed key
        `${CACHE}:${key}`,
        // api client --gql
        useNuxtApp().$gql,
        // access token getter
        () => useAuth().token,
      ),
  }[<TUseCacheKeyDriver>useRuntimeConfig().public.cacheKeyDriver](key);

  const data = useComputed$<TRecordJson>(service.data$, {});

  const destroy = () => {
    service.destroy();
  };
  onScopeDispose(destroy);

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
