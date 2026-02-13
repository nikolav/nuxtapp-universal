import type { Observable } from "rxjs";
import { BehaviorSubject, defer } from "rxjs";
import {
  combineLatestWith,
  filter,
  map,
  scan,
  shareReplay,
  switchMap,
  take,
  tap,
} from "rxjs/operators";
import type TEcho from "laravel-echo";

import type { TFnMaybeAsync, TOrNoValue } from "~/types";
import { useCleanup } from "~/composables/utils/use-cleanup";
import { useAuth } from "~/stores/use-auth.store";
import { isPresent } from "~/utils/is-present";
import { onDebug } from "~/utils/on-debug";

export const useIO = () => {
  const { reverb } = useRuntimeConfig().public.broadcasting;

  const deps$ = useNuxtApp()
    .$window$.pipe(
      combineLatestWith(
        defer(() => import("laravel-echo")),
        defer(() => import("pusher-js")),
      ),
    )
    .pipe(
      map(([w, { default: Echo }, { default: Pusher }]) => ({
        w,
        Echo,
        Pusher,
      })),
      filter(({ w, Echo, Pusher }) => [w, Echo, Pusher].every(isPresent)),
      take(1),
      tap(({ w, Pusher }) => {
        (<any>w).Pusher = Pusher;
        (<any>globalThis).Pusher = Pusher;
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

  const auth = useAuth();
  const token$ = new BehaviorSubject<TOrNoValue<string>>(null);
  watchEffect(() => {
    token$.next(auth.token);
  });

  const echo: Observable<TEcho<"reverb">> = deps$.pipe(
    switchMap(({ Echo }) =>
      token$.pipe(
        map(
          (token) =>
            new Echo({
              broadcaster: "reverb",
              key: reverb.key,

              // scheme: reverb.scheme,
              wsHost: reverb.host,
              // wsPath: "/app",

              forceTLS: true,
              wsPort: 80,
              wssPort: reverb.port,
              enabledTransports: ["ws", "wss"],
              // enabledTransports: ["wss"],
              disableStats: true,

              ...(token
                ? {
                    authEndpoint: reverb.authEndpoint,
                    auth: {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    },
                  }
                : {}),
            }),
        ),
        scan(
          (accum, curr) => {
            return {
              prev: accum.curr,
              curr,
            };
          },
          <{ prev: unknown; curr: unknown }>{ prev: null, curr: null },
        ),
        tap(({ prev }) => {
          if (!prev) return;
          try {
            (<any>prev).disconnect?.();
          } catch (error) {
            onDebug({ "echo:prev:disconnect:error": error });
          }
        }),
        map(({ curr }) => <TEcho<"reverb">>curr),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  // pass callback and cleanup task to echo access
  const client = (
    callback: (
      echo: TEcho<"reverb">,
      onCleanup: (fn: TFnMaybeAsync<void>) => void,
    ) => void,
  ) => {
    const cleanup = useCleanup();
    const sub = echo.pipe(take(1)).subscribe((e) => callback(e, cleanup.task));
    onScopeDispose(() => {
      cleanup.run();
      sub.unsubscribe();
    });
  };

  // useIO().client((echo, cleanup) => listenStuff(echo).then(cleanup);)
  return { client };
};
