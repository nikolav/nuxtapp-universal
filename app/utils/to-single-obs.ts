import { first, shareReplay } from "rxjs/operators";

import { to$ } from "~/utils/to-obs";
import { isPresent } from "~/utils/is-present";
import type { TMaybeAsync } from "~/types";

export const single$ = <T = unknown>(stream: TMaybeAsync<T>) =>
  to$(stream).pipe(
    first(isPresent),
    shareReplay({ bufferSize: 1, refCount: false }),
  );
