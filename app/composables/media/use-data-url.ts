import { shallowReadonly, shallowRef, toValue, watch } from "vue";
import { tryOnScopeDispose } from "@vueuse/shared";

import type { TOrNoValue } from "~/types";

interface IUseDataUrlOptions {
  link?: boolean;
  dataUrl?: boolean;
}

export const useDataUrl = (
  opts: IUseDataUrlOptions = { link: true, dataUrl: true },
) => {
  const media = shallowRef<TOrNoValue<Blob | MediaSource>>();

  const urlLink = shallowRef<TOrNoValue<string>>();
  const urlData = shallowRef<TOrNoValue<string>>();

  const destroy = () => {
    if (urlLink.value) URL.revokeObjectURL(urlLink.value);
    urlLink.value = undefined;
    urlData.value = undefined;
  };

  watch(
    () => toValue(media),
    (object) => {
      destroy();
      if (!object) return;

      // calc urls
      if (opts.link) urlLink.value = URL.createObjectURL(object);
      if (opts.dataUrl)
        (async () => {
          urlData.value = await new Promise((resolve, reject) => {
            try {
              if (!(object instanceof Blob)) throw new Error("node !Blob.");
              const reader = new FileReader();
              reader.onerror = reject;
              reader.onload = () => {
                resolve(String(reader.result ?? ""));
              };
              reader.readAsDataURL(object);
            } catch (error) {
              reject(error);
            }
          });
        })();
    },
    { immediate: true },
  );

  tryOnScopeDispose(destroy);

  return {
    // external file/blob
    media,

    // calculated urls
    link: shallowReadonly(urlLink),
    dataUrl: shallowReadonly(urlData),

    // release resource
    destroy,
  };
};

export const useMediaUrl = useDataUrl;
