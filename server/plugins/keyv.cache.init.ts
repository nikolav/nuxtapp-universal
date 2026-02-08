import Keyv from "keyv";
import KeyvRedis from "@keyv/redis";
import KeyvCompressLZ4 from "@keyv/compress-lz4";

import type { TCacheConnection } from "#server/types";

export default defineNitroPlugin((nitroApp) => {
  const { cache: config } = useRuntimeConfig();

  const cache = new Keyv({
    namespace: config.namespace,
    store: {
      memory: () => config.connections.memory,
      redis: () => new KeyvRedis(config.connections.redis),
    }[<TCacheConnection>config.connection](),
    compression: new KeyvCompressLZ4(),
  });

  cache?.on("error", (errorCache) => {
    console.error({
      [`error.cache.${config.connection}@${config.namespace}`]: errorCache,
    });
  });

  nitroApp.hooks.addHooks({
    request: (event) => {
      Object.assign(event.context, {
        cache,
        cacheDefaultTtlMs: config.ttlMs,
      });
    },
  });
});

declare module "h3" {
  interface H3EventContext {
    cache: Keyv;
    cacheDefaultTtlMs: number;
  }
}
