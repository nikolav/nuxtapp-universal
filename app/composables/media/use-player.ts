import { defer } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import type { TPlayer } from "~/types";
import { single$ } from "~/utils/to-value-obs";

export const usePlayer = () =>
  single$(
    useNuxtApp().$platformBrowser$.pipe(
      switchMap(() =>
        defer(() => import("plyr")).pipe(
          map((val) => ({ Plyr: <TPlayer>(<any>val).default })),
        ),
      ),
    ),
  );
