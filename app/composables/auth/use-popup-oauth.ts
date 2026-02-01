import { from, switchMap } from "rxjs";

import { usePopupWindow } from "~/composables";
import { schemaOAuthPayload, schemaOAuthProviders } from "~/schemas";

export const usePopupOAuth = () => {
  const { $window$ } = useNuxtApp();
  const { apiBase } = useRuntimeConfig().public;
  const popupWindow = usePopupWindow();

  const signInWithProvider = (provider: string) =>
    $window$.pipe(
      switchMap((window) =>
        popupWindow
          .open(
            `${apiBase}/oauth/${schemaOAuthProviders.parse(provider)}/redirect`,
          )
          .pipe(
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

                  function onMessage(event: MessageEvent) {
                    try {
                      const expectedOrigin = new URL(apiBase).origin;

                      // origin must match and message must come from that popup window
                      if (
                        event.origin !== expectedOrigin ||
                        event.source !== popup
                      ) {
                        cleanup();
                        reject(
                          new Error(
                            "Access denied. Invalid message source/origin.",
                          ),
                        );
                        return;
                      }

                      const data = schemaOAuthPayload.parse(event.data);
                      cleanup();
                      resolve(data.token);
                    } catch (error) {
                      cleanup();
                      reject(error);
                    }
                  }

                  let done = false;
                  let timer: number | undefined;

                  function cleanup() {
                    if (done) return;
                    done = true;

                    window.clearTimeout(timeout);
                    if (timer) window.clearInterval(timer);
                    window.removeEventListener("message", onMessage);
                    try {
                      popup?.close();
                    } catch {}
                  }

                  // timeout 2min to complete auth form
                  const timeout = window.setTimeout(
                    () => {
                      cleanup();
                      reject(new Error("Login timed out."));
                    },
                    2 * 60 * 1000,
                  );

                  // close watcher; if user closes popup early
                  timer = window.setInterval(() => {
                    if (popup.closed) {
                      cleanup();
                      reject(
                        new Error("Popup closed before completing login."),
                      );
                    }
                  }, 412);
                }),
              ),
            ),
          ),
      ),
    );

  return { signInWithProvider };
};
