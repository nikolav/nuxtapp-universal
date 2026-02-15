import Keyv from "keyv";
import KeyvRedis from "@keyv/redis";
import KeyvCompressLZ4 from "@keyv/compress-lz4";

import type { TCacheConnection } from "#server/types";

export default defineNitroPlugin(async (nitroApp) => {
  const { cache: config } = useRuntimeConfig();

  const memoryStore = ((<any>globalThis).__keyvMemoryStore ??= new Map<
    string,
    any
  >());

  const cache = new Keyv({
    namespace: config.namespace,
    store: config.enabled
      ? {
          memory: () => memoryStore,
          redis: () => new KeyvRedis(config.connections.redis.url),
        }[<TCacheConnection>config.connection]()
      : memoryStore,
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

  try {
    if (await cache.set("keyv", "keyv"))
      console.log(`${config.connection}.cache@keyv.initialized`);
  } catch (error) {
    // pass
  }
});

declare module "h3" {
  interface H3EventContext {
    cache: Keyv;
    cacheDefaultTtlMs: number;
  }
}
