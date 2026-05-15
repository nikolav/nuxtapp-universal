import { map, take } from "rxjs/operators";

import type { TDomContext, TDomSelector } from "~/types";

export const useDom = (selector: TDomSelector, context?: TDomContext) =>
  useNuxtApp().$dom.pipe(
    take(1),
    map(({ $ }) => $(selector, context)),
  );
