import { from, switchMap } from "rxjs";

import { usePopupWindow } from "~/composables/ui/use-popup-window";
import { schemaOAuthPayload, schemaOAuthProviders } from "~/schemas";

export const usePopupOAuth = () => {
  const { $window$ } = useNuxtApp();
  const { apiBase } = useRuntimeConfig().public;
  const popupWindow = usePopupWindow();
  const expectedOrigin = new URL(apiBase).origin;

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
                    // // ignore anything not shaped like oauth message
                    // const d: any = event.data;
                    // if (!d || typeof d !== "object") return;
                    // if (d.type !== "oauth:token" && d.type !== "oauth:error")
                    //   return;

                    // validate origin + source
                    if (event.origin !== expectedOrigin) return;
                    if (event.source !== popup) return;

                    const parsed = schemaOAuthPayload.safeParse(event.data);
                    if (!parsed.success) return;

                    cleanup();

                    if (parsed.data.type === "oauth:error") {
                      reject(new Error(parsed.data.error ?? "OAuth error"));
                    } else {
                      resolve(parsed.data.token);
                    }
                  }

                  let done = false;
                  let timer: number | undefined;

                  function cleanup() {
                    if (done) return;
                    done = true;

                    window.clearTimeout(timeout);
                    if (null != timer) window.clearInterval(timer);
                    window.removeEventListener("message", onMessage);
                  }

                  // timeout 2min to complete auth form
                  const timeout = window.setTimeout(
                    () => {
                      cleanup();
                      reject(new Error("Login timed out."));
                    },
                    12 * 60 * 1000,
                  );

                  // close watcher; if user closes popup early
                  timer = window.setInterval(() => {
                    try {
                      if (popup.closed) {
                        cleanup();
                        reject(
                          new Error("Popup closed before completing login."),
                        );
                      }
                    } catch {
                      // COOP/isolation: can't read .closed; stop polling and rely on timeout
                      if (null != timer) window.clearInterval(timer);
                    }
                  }, 555);
                }),
              ),
            ),
          ),
      ),
    );

  return { signInWithProvider };
};
