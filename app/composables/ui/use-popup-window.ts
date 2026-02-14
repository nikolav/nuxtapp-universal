import { of } from "rxjs";
import { switchMap } from "rxjs/operators";

import type { TOrNoValue } from "~/types";

export const usePopupWindow = () => {
  const { $window$ } = useNuxtApp();

  const target = ref<TOrNoValue<globalThis.WindowProxy>>(null);

  const destroy = () => {
    target.value?.close();
  };

  const open = (url: string, name = "oauth", w = 420, h = 550) =>
    $window$.pipe(
      switchMap((window) => {
        const document = window.document;
        const screen = window.screen;

        const dualScreenLeft = window.screenLeft ?? window.screenX;
        const dualScreenTop = window.screenTop ?? window.screenY;

        const width =
          window.innerWidth ??
          document.documentElement.clientWidth ??
          screen.width;

        const height =
          window.innerHeight ??
          document.documentElement.clientHeight ??
          screen.height;

        const left = Math.max(0, (width - w) / 2 + dualScreenLeft);
        const top = Math.max(0, (height - h) / 2 + dualScreenTop);

        destroy();
        const popup = window.open(
          url,
          name,
          `scrollbars=yes,width=${w},height=${h},top=${top},left=${left}`,
        );

        target.value = popup;
        return of(popup);
      }),
    );

  return { target, open, destroy };
};
