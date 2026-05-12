import { tryOnScopeDispose } from "@vueuse/shared";

import type { TFileStorageMetadata } from "~/types";
import type { FileStorageBase } from "~/services/filestorage/base";
import { schemaFileStorageDriver } from "~/schemas";
import { FileStorageDriverLocal } from "~/services/filestorage/driver-local";
import { useComputed$ } from "~/composables/utils/use-computed-obs";

export const useFileStoarage = (prefix = "/") => {
  //
  const service: FileStorageBase = {
    local: () => new FileStorageDriverLocal(prefix),
  }[
    schemaFileStorageDriver.parse(
      useNuxtApp().$$.config("public.fileStorageDriver"),
    )
  ]();

  const files = useComputed$(service.files$, <TFileStorageMetadata[]>[]);

  const destroy = async () => {
    await useNuxtApp().$$.resolved(service.destroy(), false);
  };
  tryOnScopeDispose(destroy);

  return {
    files,
    push: service.push.bind(service),
    rm: service.rm.bind(service),
    pull: service.pull.bind(service),
    url: service.url.bind(service),
    meta: service.meta.bind(service),
    destroy,
  };
};
