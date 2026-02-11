import { CacheByKeyDriverLocal } from "~/services/cache-by-key/local";
import { useProcessMonitor } from "../utils/use-process-monitor";
import type { TRecordJson, TUseCacheKeyDriver } from "~/types";
import type { CacheByKeyBase } from "~/services/cache-by-key/base";

export const useCacheKey = (
  key: string,
  driver: TUseCacheKeyDriver = "local",
) => {
  const client: CacheByKeyBase = {
    // cached at client, testing, local, etc.
    local: (key: string) => CacheByKeyDriverLocal.single(key),
  }[driver](key);

  const ps = useProcessMonitor();
  const cache = useAsyncData(
    key,
    () => ps.monitor(() => client.data$.getValue()),
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

  const data_s = client.data$.subscribe(() => {
    cache.refresh();
  });

  const destroy = () => {
    data_s.unsubscribe();
    client.destroy();
  };
  onScopeDispose(destroy);

  return {
    cache,
    ps,
    push: client.push.bind(client),
    drop: client.drop.bind(client),
    destroy,
  };
};
