import each from "lodash/each";

import type { TManageSubscriptionsCache } from "~/types";
import { coreHasOwn } from "~/utils/core-has-own";

export class ManageSubscriptionsService {
  private cache = <TManageSubscriptionsCache>{};

  clear(...keys: string[]) {
    keys.forEach((key) => {
      if (coreHasOwn(this.cache, key)) {
        this.cache[key]?.unsubscribe();
        delete this.cache[key];
      }
    });
  }

  push(subs: TManageSubscriptionsCache) {
    each(subs, (sub, key) => {
      this.cache[key]?.unsubscribe();
      this.cache[key] = sub;
    });
  }

  destroy() {
    each(this.cache, (sub) => {
      sub?.unsubscribe();
    });
    this.use({});
  }

  use(newCache: TManageSubscriptionsCache) {
    this.cache = { ...newCache };
  }
}
