import { useAuth } from "~/stores/use-auth.store";

export default defineNuxtRouteMiddleware((to, from) => {
  const { $$ } = useNuxtApp();
  const auth = useAuth();

  $$.onDebug({ "mw:guest": { to, from } });

  const {
    services: {
      auth: { DEFAULT_AUTHENTICATED_ROUTE_NAME },
    },
  } = useAppConfig();
  const localePath = useLocalePath();

  if (auth.isAuth)
    return navigateTo(localePath({ name: DEFAULT_AUTHENTICATED_ROUTE_NAME }));
});
