import { useAuth } from "~/stores";

export default defineNuxtRouteMiddleware(() => {
  console.info("mw:guest");

  const auth = useAuth();
  if (auth.isAuth) return abortNavigation();
});
