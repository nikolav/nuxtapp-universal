import { CacheByKeyDriverLocal } from "~/services/doc/local";
import { CacheByKeyDriverFirebase } from "~/services/doc/driver-firebase";
import { CacheByKeyDriverApi } from "~/services/doc/driver-api";
import type { CacheByKeyBase } from "~/services/doc/base";
import { useProcessMonitor } from "~/composables/utils/use-process-monitor";
import { useAuth } from "~/stores/use-auth.store";
import type { TRecordJson, TUseCacheKeyDriver } from "~/types";

export const useDoc = (key: string) => {
  const { CACHE_BY_KEY: CACHE } = useAppConfig().keys;
  const service: CacheByKeyBase = {
    // cached at client, testing, local, etc.
    local: (key: string) => CacheByKeyDriverLocal.single(`${CACHE}:${key}`),
    firebase: (key: string) => new CacheByKeyDriverFirebase(key, CACHE),
    api: (key: string) =>
      new CacheByKeyDriverApi(
        // composed key
        `${CACHE}:${key}`,
        // api client --gql
        useNuxtApp().$gql,
        // access token getter
        () => useAuth().token,
      ),
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
