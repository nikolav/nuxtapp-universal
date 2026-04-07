import { onDebug } from "~/utils/on-debug";
import { useAuth } from "~/stores/use-auth.store";
import { useAppConfigItem } from "~/composables/utils/use-app-config-item";

export default defineNuxtRouteMiddleware((to, from) => {
  onDebug({ "mw:guest": { to, from } });

  const auth = useAuth();
  const localePath = useLocalePath();

  if (auth.isAuth)
    return navigateTo(
      localePath({
        name: useAppConfigItem("services.auth.DEFAULT_AUTHENTICATED_ROUTE_NAME")
          .value,
      }),
    );
});
