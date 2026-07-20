import { useSubscription } from "@vueuse/rxjs";

import type { TDirective } from "~/types";
import { onDebug } from "~/utils/on-debug";
import { useDom } from "~/composables/dom/use-dom";

export const vDemo = <TDirective>{
  mounted: (el, binding) => {
    useSubscription(
      useDom(el).subscribe(($coll) => {
        $coll.on({
          click: (event) => {
            onDebug({
              "v-demo directive": {
                el,
                binding,
                event,
              },
            });
          },
        });
      }),
    );
  },
};
