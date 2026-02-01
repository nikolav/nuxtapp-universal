import * as authStrategies from "~/services/auth";
import type { AuthService } from "~/services/auth/base";
import type { ICredentials, IUser, TOrNoValue } from "~/types";

export const useAuth = defineStore("store:auth", () => {
  const { $$ } = useNuxtApp();
  const strategy = useRuntimeConfig().public.authDriver ?? "memory";
  const authService: AuthService<IUser, ICredentials> = $$.get(
    authStrategies,
    strategy,
  );

  const account = ref<TOrNoValue<IUser>>(null);
  const isAuth = computed(() => Boolean($$.get(account.value, "id")));

  const account_s = authService.account$.subscribe((user) => {
    account.value = user;
  });

  const destroy = () => {
    account_s.unsubscribe();
  };

  return {
    token: authService.token,
    account,
    isAuth,
    authenticate: authService.authenticate,
    register: authService.register,
    logout: authService.logout,
    destroy,
  };
});
