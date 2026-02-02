import { tap } from "rxjs/operators";

import { usePopupOAuth } from "~/composables";
import { AuthApiService, AuthMemoryService } from "~/services/auth";
import type { ICredentials, IUser, TAuthService, TOrNoValue } from "~/types";

export const useAuth = defineStore("store:auth", () => {
  const { $$ } = useNuxtApp();
  const authService: TAuthService<IUser, ICredentials> = $$.get(
    {
      memory: () => new AuthMemoryService(),
      api: () => new AuthApiService(),
    },
    useRuntimeConfig().public.authDriver,
  )();

  const { signInWithProvider: signInWithProviderBase_ } = usePopupOAuth();
  const signInWithProvider = (provider: string) =>
    signInWithProviderBase_(provider).pipe(
      tap((value) => {
        authService.idToken.value = value;
      }),
    );

  const account = ref<TOrNoValue<IUser>>(null);
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
    signInWithProvider,
    destroy,
  };
});
