import { AuthMemoryService } from "~/services/auth";
import type { ICredentials, TAuthService, TOrNoValue, TUser } from "~/types";

export const useAuth = defineStore("store:auth", () => {
  const { $$ } = useNuxtApp();
  const authService: TAuthService<TUser, ICredentials> = $$.get(
    {
      memory: () => new AuthMemoryService(),
    },
    useRuntimeConfig().public.authDriver,
  )();

  const account = ref<TOrNoValue<TUser>>(null);
  const isAuth = computed(() => Boolean($$.get(account.value, "id")));

  const account_s = authService.account$.subscribe((account_) => {
    account.value = account_;
  });

  const destroy = () => {
    account_s.unsubscribe();
  };

  return {
    idToken: authService.idToken,
    access_token: authService.access_token,
    account,
    isAuth,
    authenticate: authService.authenticate,
    logout: authService.logout,
    register: authService.register,
    destroy,
  };
});
