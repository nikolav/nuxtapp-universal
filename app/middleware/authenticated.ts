import { useAuth } from "~/stores/use-auth.store";

export default defineNuxtRouteMiddleware(() => {
  console.info("mw:authenticated");

  const auth = useAuth();
  const {
    services: {
      auth: { DEFAULT_UNAUTHENTICATED_ROUTE_NAME },
    },
  } = useAppConfig();
  const localePath = useLocalePath();

  if (!auth.isAuth) {
    return navigateTo(localePath({ name: DEFAULT_UNAUTHENTICATED_ROUTE_NAME }));
  }
});
