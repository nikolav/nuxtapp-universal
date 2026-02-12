import { CacheByKeyDriverLocal } from "~/services/doc/local";
import { useProcessMonitor } from "../utils/use-process-monitor";
import type { TRecordJson, TUseCacheKeyDriver } from "~/types";
import type { CacheByKeyBase } from "~/services/doc/base";
import { CacheByKeyDriverApi } from "~/services/doc/driver-api";
import { useAuth } from "~/stores/use-auth.store";
import { useComputed$ } from "~/composables/utils/use-computed-obs";

export const useDoc = (key: string) => {
  const ps = useProcessMonitor();
  const { CACHE_BY_KEY: CACHE } = useAppConfig().keys;
  const service: CacheByKeyBase = {
    local: (key: string) => CacheByKeyDriverLocal.single(ps, `${CACHE}:${key}`),
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
    push: service.push.bind(service),
    drop: service.drop.bind(service),
    pull: service.pull.bind(service),
    destroy,
  };
};
