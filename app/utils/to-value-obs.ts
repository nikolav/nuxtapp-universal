import { filter, shareReplay, take } from "rxjs/operators";

import { to$ } from "~/utils/to-obs";
import { isPresent } from "~/utils/is-present";
import type { TMaybeAsync } from "~/types";

export const value$$ = <T = unknown>(value: TMaybeAsync<T>) =>
  to$(value).pipe(
    filter(isPresent),
    take(1),
    shareReplay({ bufferSize: 1, refCount: false }),
  );
