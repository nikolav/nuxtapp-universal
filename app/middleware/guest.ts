import { useAuth } from "~/stores/use-auth.store";

export default defineNuxtRouteMiddleware(() => {
  console.info("mw:guest");

  const auth = useAuth();
  const {
    services: {
      auth: { DEFAULT_AUTHENTICATED_ROUTE_NAME },
    },
  } = useAppConfig();
  const localePath = useLocalePath();

  if (auth.isAuth)
    return navigateTo(localePath({ name: DEFAULT_AUTHENTICATED_ROUTE_NAME }));
});
