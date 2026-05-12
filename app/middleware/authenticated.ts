import { onDebug } from "~/utils/on-debug";
import { useAuth } from "~/stores/use-auth.store";

export default defineNuxtRouteMiddleware((to, from) => {
  onDebug({ "mw:authenticated": { to, from } });

  const localePath = useLocalePath();
  const { $$ } = useNuxtApp();

  const auth = useAuth();

  if (!auth.isAuth) {
    return navigateTo(
      localePath({
        name: $$.config("services.auth.DEFAULT_UNAUTHENTICATED_ROUTE_NAME"),
      }),
    );
  }
});
