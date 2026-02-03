import { tap } from "rxjs/operators";

import { usePopupOAuth, useProcessMonitor } from "~/composables";
import { schemaAuthToken } from "~/schemas";
import { AuthApiService, AuthMemoryService } from "~/services/auth";
import type { ICredentials, IUser, TAuthService, TOrNoValue } from "~/types";

export const useAuth = defineStore("store:auth", () => {
  const { $$ } = useNuxtApp();
  const config = useRuntimeConfig().public;
  const ps = useProcessMonitor();

  const authService: TAuthService<IUser, ICredentials> = $$.get(
    {
      memory: () => new AuthMemoryService(),
      api: () => new AuthApiService(config),
    },
    config.auth.driver,
  )();

  const account = ref<TOrNoValue<IUser>>(null);
  const isAuth = computed(() => null != $$.get(account.value, "id"));

  const account_s = authService.account$.subscribe((account_) => {
    account.value = account_;
  });

  // @token; sync account
  watch(authService.token, (token) => {
    ps.begin();
    (async () => {
      try {
        authService.account$.next(
          token ? await $$.resolved<IUser>(authService.account(token)) : null,
        );
      } catch (error) {
        ps.setError(error);
      } finally {
        ps.done();
      }
      if (!ps.error.value) ps.successful();
    })();
  });

  const authenticate = async (credenitals: ICredentials) => {
    if (isAuth.value) return;
    try {
      ps.begin();
      return await $$.resolved(authService.authenticate(credenitals));
    } catch (error) {
      ps.setError(error);
    } finally {
      ps.done();
    }
    if (!ps.error.value) ps.successful();
  };

  const logout = async () => {
    if (!isAuth.value) return;
    try {
      ps.begin();
      await $$.resolved<void>(authService.logout());
    } catch (error) {
      ps.setError(error);
    } finally {
      ps.done();
    }
    if (!ps.error.value) ps.successful();
  };

  const register = async (credentials: ICredentials) => {
    try {
      ps.begin();
      return await $$.resolved(authService.register(credentials));
    } catch (error) {
      ps.setError(error);
    } finally {
      ps.done();
    }
    if (!ps.error.value) ps.successful();
  };

  const { signInWithProvider: signInWithProviderBase_ } = usePopupOAuth();
  // cast observable to promise
  const signInWithProvider = async (provider: string) => {
    if (isAuth.value) return;
    try {
      ps.begin();
      return await $$.resolved(
        signInWithProviderBase_(provider).pipe(
          tap((token) => {
            authService.token.value = schemaAuthToken.parse(token);
          }),
        ),
      );
    } catch (error) {
      ps.setError(error);
    } finally {
      ps.done();
    }
    if (!ps.error.value) ps.successful();
  };

  // cache token to autoload auth
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

  const destroy = () => {
    account_s.unsubscribe();
  };

  return {
    status: ps,
    token: authService.token,
    account,
    isAuth,
    authenticate,
    logout,
    register,
    signInWithProvider,
    destroy,
  };
});
