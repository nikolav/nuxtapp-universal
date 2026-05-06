import { z } from "zod";
import { fileTypeFromBlob } from "file-type";
import type { FileTypeResult as TFileTypeResult } from "file-type";

import type { TOrNoValue } from "~/types";
import { onDebug } from "~/utils/on-debug";
import { useProcessMonitor } from "~/composables/utils/use-process-monitor";

export type TUseObjectMetadataConfig = {
  type: "blob" | "file" | "buffer" | "stream";
};

export type TUseObjectMetadataFileTypeMetadata = TOrNoValue<
  Partial<TFileTypeResult> & {
    name?: string;
    size?: number;
    type?: string;
    lastModified?: number;
  }
>;

const schemaBlobMetadata = z.object({
  name: z.optional(z.string()),
  size: z.optional(z.number()),
  type: z.optional(z.string()),
  lastModified: z.optional(z.number()),
});

// #https://github.com/sindresorhus/file-type#supported-file-types
export const useObjectMetadata = <T = unknown>(
  config: TUseObjectMetadataConfig = { type: "blob" },
) => {
  //
  const { $$ } = useNuxtApp();
  const ps = useProcessMonitor();

  const metadata = shallowRef<TUseObjectMetadataFileTypeMetadata>();
  const object = shallowRef<TOrNoValue<T>>();
  watch(
    object,
    (f: any) => {
      metadata.value = null;
      if (!f) return;
      (async () => {
        try {
          switch (true) {
            // takes blob
            case "blob" === config.type:
              metadata.value = $$.copy(
                {},
                Object(schemaBlobMetadata.safeParse(f).data),
                await ps.exec(() => fileTypeFromBlob(f)),
              );
              break;

            // takes filepath
            case "file" === config.type:
              throw new Error("not implemented");
              break;

            // takes int buffer
            case "buffer" === config.type:
              throw new Error("not implemented");
              break;

            // takes url stream
            case "stream" === config.type:
              throw new Error("not implemented");
              break;

            default:
              break;
          }
        } catch (error) {
          onDebug({ "error:use-object-metadata": error });
        }
      })();
    },
    {
      immediate: true,
    },
  );

  return {
    status: {
      processing: ps.processing,
      error: ps.error,
      success: ps.success,
    },
    object,
    metadata,
  };
};
