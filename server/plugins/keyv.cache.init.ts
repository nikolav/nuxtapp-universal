import Keyv from "keyv";
import KeyvRedis from "@keyv/redis";
import KeyvCompressLZ4 from "@keyv/compress-lz4";

import type { TCacheConnection } from "#server/types";

export default defineNitroPlugin(async (nitroApp) => {
  const { cache: config } = useRuntimeConfig();

  const cache = new Keyv({
    namespace: config.namespace,
    store: config.enabled
      ? {
          memory: () => config.connections.memory,
          redis: () => new KeyvRedis(config.connections.redis),
        }[<TCacheConnection>config.connection]()
      : config.connections.memory,
    compression: new KeyvCompressLZ4(),
  });

  cache.on("error", (errorCache) => {
    console.error({
      [`error.cache.${config.connection}@${config.namespace}`]: errorCache,
    });
  });

  nitroApp.hooks.hook("request", (event) => {
    event.context.cache = cache;
    event.context.cacheDefaultTtlMs = config.ttlMs;
  });

  console.log({ [`cache.${config.connection}@keyv.initialized`]: cache });
});

declare module "h3" {
  interface H3EventContext {
    cache: Keyv;
    cacheDefaultTtlMs: number;
  }
}
