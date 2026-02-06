import { filter, shareReplay, take } from "rxjs/operators";

import { to$ } from "~/utils/to-obs";
import type { TMaybeAsync, TOrNoValue } from "~/types";

const isPresent = <T>(v: TOrNoValue<T>): v is T => v != null;

export const value$$ = <T = unknown>(value: TMaybeAsync<T>) =>
  to$(value).pipe(
    filter(isPresent),
    take(1),
    shareReplay({ bufferSize: 1, refCount: false }),
  );
