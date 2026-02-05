import { useAuth } from "~/stores";

export default defineNuxtRouteMiddleware(() => {
  console.info("mw:authenticated");

  const auth = useAuth();
  const {
    services: {
      auth: { DEFAULT_UNAUTHENTICATED_ROUTE_NAME },
    },
  } = useAppConfig();
  if (!auth.isAuth) {
    return navigateTo({ name: DEFAULT_UNAUTHENTICATED_ROUTE_NAME });
  }
});
