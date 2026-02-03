import { onScopeDispose } from "vue";
import { tap } from "rxjs/operators";

import { usePopupOAuth, useProcessMonitor } from "~/composables";
import { schemaAuthDriver, schemaAuthToken } from "~/schemas";
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
    schemaAuthDriver.parse(config.auth.driver),
  )();

  const account = ref<TOrNoValue<IUser>>(null);
  const isAuth = computed(() => null != $$.get(account.value, "id"));

  const account_s = authService.account$.subscribe((account_) => {
    account.value = account_;
  });

  // @token; sync account, latest only
  watch(
    authService.token,
    async (token, _prev, cleanup) => {
      ps.begin();
      let cancelled = false;
      cleanup(() => {
        cancelled = true;
      });

      try {
        const nextAccount = token
          ? await $$.resolved<IUser>(authService.account(token))
          : null;

        if (!cancelled) authService.account$.next(nextAccount);
      } catch (e) {
        if (!cancelled) ps.setError(e);
      } finally {
        if (!cancelled) {
          ps.done();
          if (!ps.error.value) ps.successful();
        }
      }
    },
    { immediate: true },
  );

  const authenticate = async (credenitals: ICredentials) =>
    !isAuth.value
      ? ps.exec(() => authService.authenticate(credenitals))
      : undefined;

  const logout = async () =>
    isAuth.value ? ps.exec<void>(() => authService.logout()) : undefined;

  const register = (credentials: ICredentials) =>
    ps.exec(() => authService.register(credentials));

  const { signInWithProvider: signInWithProviderBase_ } = usePopupOAuth();
  const signInWithProvider = async (provider: string) =>
    !isAuth.value
      ? ps.exec(() =>
          signInWithProviderBase_(provider).pipe(
            tap((token) => {
              authService.token.value = token;
            }),
          ),
        )
      : undefined;

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
  watch(authService.token, (token) => {
    storageAuth.value = token ?? "";
  });

  const destroy = () => {
    account_s.unsubscribe();
  };

  onScopeDispose(destroy);

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
