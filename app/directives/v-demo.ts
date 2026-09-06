import { useSubscription } from "@vueuse/rxjs";

import { onDebug } from "~/utils/on-debug";
import { defineVueDirective } from "~/lib/define-vue-directive";
import { useDom } from "~/composables/dom/use-dom";

export const vDemo = defineVueDirective({
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
});
