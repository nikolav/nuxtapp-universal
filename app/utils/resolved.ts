import { firstValueFrom } from "rxjs";
import { filter } from "rxjs/operators";

import { to$ } from "./to-obs";
import type { TMaybeAsync } from "~/types";

export const resolved = async <T = unknown>(
  val: TMaybeAsync<T>,
  truethy = true,
) => {
  return await firstValueFrom(
    to$(val).pipe(filter((val) => (truethy ? Boolean(val) : true))),
  );
};
