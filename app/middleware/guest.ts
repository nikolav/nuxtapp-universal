import { useAuth } from "~/stores/use-auth.store";

export default defineNuxtRouteMiddleware(() => {
  console.info("mw:guest");

  const auth = useAuth();
  if (auth.isAuth) return abortNavigation();
});
