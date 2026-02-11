import { CacheByKeyDriverLocal } from "~/services/doc/local";
import { useProcessMonitor } from "../utils/use-process-monitor";
import type { TRecordJson, TUseCacheKeyDriver } from "~/types";
import type { CacheByKeyBase } from "~/services/doc/base";
import { CacheByKeyDriverApi } from "~/services/doc/driver-api";
import { useAuth } from "~/stores/use-auth.store";

export const useDoc = (key: string) => {
  const service: CacheByKeyBase = {
    // cached at client, testing, local, etc.
    local: (key: string) => CacheByKeyDriverLocal.single(key),
    api: (key: string) =>
      new CacheByKeyDriverApi(key, useNuxtApp().$gql, () => useAuth().token),
  }[<TUseCacheKeyDriver>useRuntimeConfig().public.cacheKeyDriver](key);

  const ps = useProcessMonitor();
  const cache = useAsyncData(
    key,
    () => ps.monitor(() => service.data$.getValue()),
    {
      immediate: true,
      lazy: true,
      default: () => {
        return <TRecordJson>{};
      },
    },
  );
  // map cache to ps
  ps.sync(cache.pending, cache.error);

  const data_s = service.data$.subscribe(() => {
    cache.refresh();
  });

  const destroy = () => {
    data_s.unsubscribe();
    service.destroy();
  };
  onScopeDispose(destroy);

  return {
    ps,
    cache,
    start: service.init.bind(service),
    push: service.push.bind(service),
    drop: service.drop.bind(service),
    pull: service.pull.bind(service),
    destroy,
  };
};
