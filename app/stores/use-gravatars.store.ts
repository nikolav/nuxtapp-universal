import md5 from "md5";
import { tryOnScopeDispose } from "@vueuse/shared";

import { useAuth } from "~/stores/use-auth.store";
import { useDoc } from "~/composables/doc/use-doc";
import { useProcessMonitor } from "~/composables/utils/use-process-monitor";

export const useGravatars = defineStore("gravatars:store", () => {
  const { $$ } = useNuxtApp();

  const ps = useProcessMonitor();
  const auth = useAuth();
  const g = useDoc("gravatars");

  const enabled = computed(
    () =>
      auth.isAuth &&
      $$.parseBoolean($$.get(g.data.value, `${auth.account?.id}.enabled`)),
  );

  const src = computed(() =>
    enabled.value ? $$.get(g.data.value, `${auth.account?.id}.src`) : "",
  );

  const enable = async (flag: boolean = true) => {
    if (flag === enabled.value) return;
    return await ps.exec(() =>
      g.commit({ [`${auth.account?.id}`]: { enabled: flag } }),
    );
  };

  const refresh = async () => {
    if (!enabled.value) return;
    return await ps.exec(() =>
      g.commit({ [`${auth.account?.id}`]: { src: url() } }),
    );
  };

  const start = () => {
    g.start();
  };

  const destroy = () => {
    g.destroy();
  };
  tryOnScopeDispose(destroy);

  function url() {
    return `${$$.trimEnd(
      $$.config("stores.gravatars.BASE_URL")!,
      "/",
    )}/${md5(email())}?d=${gmode()}&size=${$$.config("stores.gravatars.SIZE")}`;
  }

  function gmode() {
    return $$.sample(
      $$.reduce(
        <Record<string, boolean>>$$.config("stores.gravatars.MODE"),
        (res, val, field) => {
          if (true === val) res.push(field);
          return res;
        },
        <string[]>[],
      ),
    );
  }

  function email() {
    return `g.${$$.nanoid()}@gravatar.com`.toLocaleLowerCase();
  }

  return {
    ps,
    enabled,
    src,
    store: g,

    enable,
    refresh,

    start,
    destroy,
  };
});
