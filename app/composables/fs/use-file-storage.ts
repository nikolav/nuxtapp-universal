import { tryOnScopeDispose } from "@vueuse/shared";

import type { TFileStorageMetadata } from "~/types";
import type { FileStorageBase } from "~/services/filestorage/base";
import { schemaFileStorageDriver } from "~/schemas";
import { FileStorageDriverLocal } from "~/services/filestorage/driver-local";
import { useComputed$ } from "~/composables/utils/use-computed-obs";

export const useFileStoarage = (prefix = "/") => {
  const { $$ } = useNuxtApp();
  const service: FileStorageBase = {
    local: () => new FileStorageDriverLocal(prefix),
  }[schemaFileStorageDriver.parse($$.config("public.fileStorageDriver"))]();

  const files = useComputed$(service.files$, <TFileStorageMetadata[]>[]);

  const destroy = async () => {
    await $$.resolved(service.destroy(), false);
  };
  tryOnScopeDispose(destroy);

  return {
    // @@objects
    files,

    // @@boot
    init: service.init.bind(service),

    // @@crud
    push: service.push.bind(service),
    pull: service.pull.bind(service),
    url: service.url.bind(service),
    meta: service.meta.bind(service),
    rm: service.rm.bind(service),

    // @@cleanup
    destroy,
  };
};
