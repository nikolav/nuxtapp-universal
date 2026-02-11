import { firstValueFrom } from "rxjs";
import { filter } from "rxjs/operators";

import { to$ } from "./to-obs";
import { isPresent } from "~/utils/is-present";
import type { TMaybeAsync } from "~/types";

export const resolved = <T = unknown>(val: TMaybeAsync<T>, present = true) =>
  firstValueFrom(
    to$(val).pipe(filter((val) => (present ? isPresent(val) : true))),
  );
