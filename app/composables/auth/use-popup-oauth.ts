import { from, switchMap } from "rxjs";

import { usePopupWindow } from "~/composables";
import { schemaJWT } from "~/schemas";

export const usePopupOAuth = () => {
  const { $window$ } = useNuxtApp();
  const { apiBase } = useRuntimeConfig().public;
  const popupWindow = usePopupWindow();

  const signInWithProvider = (provider: string) =>
    $window$.pipe(
      switchMap((window) =>
        popupWindow.open(`${apiBase}/oauth/${provider}/redirect`).pipe(
          switchMap((popup) =>
            from(
              new Promise<string>((resolve, reject) => {
                // popups blocked; throw notice
                if (!popup) {
                  reject(
                    new Error(
                      "Popup blocked. Please allow popups and try again.",
                    ),
                  );
                  return;
                }

                window.addEventListener("message", onMessage);

                // 10min timeout
                const timeout = window.setTimeout(
                  () => {
                    cleanup();
                    reject(new Error("Login timed out."));
                  },
                  10 * 60 * 1000,
                );

                function cleanup() {
                  window.clearTimeout(timeout);
                  window.removeEventListener("message", onMessage);
                  try {
                    popup?.close();
                  } catch {
                    // pass
                  }
                }

                function onMessage(ev: MessageEvent) {
                  // Only accept messages from your API origin
                  const apiOrigin = new URL(apiBase).origin;

                  if (ev.origin !== apiOrigin) {
                    reject(new Error("Access denied. Invalid origin."));
                    return;
                  }

                  const data = ev.data;
                  if (
                    !data ||
                    data.type !== "oauth:token" ||
                    typeof data.token !== "string"
                  ) {
                    reject(new Error("Invalid token format."));
                    return;
                  }

                  cleanup();
                  try {
                    resolve(schemaJWT.parse(data.token));
                  } catch (error) {
                    reject(error);
                  }
                }

                // Optional: if user closes popup early
                const timer = window.setInterval(() => {
                  if (popup.closed) {
                    window.clearInterval(timer);
                    cleanup();
                    reject(new Error("Popup closed before completing login."));
                  }
                }, 422);
              }),
            ),
          ),
        ),
      ),
    );

  return { signInWithProvider };
};
