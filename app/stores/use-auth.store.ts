import { firstValueFrom } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { usePopupOAuth } from "~/composables";
import { schemaAuthToken } from "~/schemas";
import { AuthApiService, AuthMemoryService } from "~/services/auth";
import type { ICredentials, IUser, TAuthService, TOrNoValue } from "~/types";

export const useAuth = defineStore("store:auth", () => {
  const { $$ } = useNuxtApp();
  const config = useRuntimeConfig().public;
  const authService: TAuthService<IUser, ICredentials> = $$.get(
    {
      memory: () => new AuthMemoryService(),
      api: () => new AuthApiService(config),
    },
    config.auth.driver,
  )();

  const { signInWithProvider: signInWithProviderBase_ } = usePopupOAuth();
  // cast observable to promise
  const signInWithProvider = (provider: string) =>
    firstValueFrom(
      signInWithProviderBase_(provider).pipe(
        tap((token) => {
          authService.token.value = schemaAuthToken.parse(token);
        }),
      ),
    );

  const account = ref<TOrNoValue<IUser>>(null);
  const isAuth = computed(() => Boolean($$.get(account.value, "id")));

  const account_s = authService.account$.subscribe((account_) => {
    account.value = account_;
  });

  const destroy = () => {
    account_s.unsubscribe();
  };

  const storageAuth = useLocalStorage(
    useAppConfig().keys.TOKEN_API_AUTH,
    () => "",
  );

  // @boot; load auth token from storage
  onNuxtReady(() => {
    callOnce(() => {
      (async () => {
        try {
          if (storageAuth.value)
            authService.token.value = schemaAuthToken.parse(storageAuth.value);
        } catch (error) {
          // pass
        }
      })();
    });
  });

  // @auth; sync storage auth token
  watch(isAuth, (isAuth) => {
    storageAuth.value = isAuth ? authService.token.value : "";
  });

  watch(authService.token, (token) => {
    (async () => {
      try {
        authService.account$.next(
          token
            ? await firstValueFrom(
                $$.to$<IUser>(authService.account(token)).pipe(filter(Boolean)),
              )
            : null,
        );
      } catch (error) {
        // pass
      }
    })();
  });

  return {
    token: authService.token,
    account,
    isAuth,
    authenticate: authService.authenticate,
    logout: authService.logout,
    register: authService.register,
    signInWithProvider,
    destroy,
  };
});
