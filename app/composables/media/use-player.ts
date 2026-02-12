import { defer } from "rxjs";
import { filter, map, shareReplay, switchMap, take } from "rxjs/operators";

import type { TPlayer } from "~/types";
import { isPresent } from "~/utils/is-present";

export const usePlayer = () =>
  useNuxtApp().$onPlatformBrowser$.pipe(
    switchMap(() =>
      defer(() => import("plyr")).pipe(
        map((val) => <TPlayer>(<any>val).default),
        filter(isPresent),
        take(1),
        shareReplay({ bufferSize: 1, refCount: false }),
      ),
    ),
  );
