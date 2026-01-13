import { from } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

export default defineNuxtPlugin({
  name: "cashdom",
  setup: () => ({
    provide: {
      dom$: from(import("cash-dom")).pipe(
        map((m) => m.default),
        shareReplay({
          bufferSize: 1,
          refCount: false,
        })
      ),
    },
  }),
});
