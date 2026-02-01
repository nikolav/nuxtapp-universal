import type { Subscription } from "rxjs";
import type { TOrNoValue } from "~/types";

export const usePopupWindow = () => {
  const { $window$ } = useNuxtApp();

  let win_s: TOrNoValue<Subscription>;
  const target = ref<TOrNoValue<globalThis.WindowProxy>>(null);

  const destroy = (force = false) => {
    win_s?.unsubscribe();
    target.value?.close();
    if (force) {
      setTimeout(() => {
        target.value = null;
      });
    }
  };

  const open = (url: string, name = "oauth", w = 420, h = 550) => {
    destroy();
    win_s = $window$.subscribe((window) => {
      const document = window.document;
      const dualScreenLeft = window.screenLeft ?? window.screenX;
      const dualScreenTop = window.screenTop ?? window.screenY;
      const width =
        window.innerWidth ??
        document.documentElement.clientWidth ??
        window.screen.width;
      const height =
        window.innerHeight ??
        document.documentElement.clientHeight ??
        window.screen.height;

      const left = Math.max(0, (width - w) / 2 + dualScreenLeft);
      const top = Math.max(0, (height - h) / 2 + dualScreenTop);

      target.value = window.open(
        url,
        name,
        `scrollbars=yes,width=${w},height=${h},top=${top},left=${left}`,
      );
    });
  };

  return { target, open, destroy };
};
