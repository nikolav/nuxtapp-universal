import { onScopeDispose } from "vue";
import { tap } from "rxjs/operators";

import { usePopupOAuth } from "~/composables/auth/use-popup-oauth";
import { useProcessMonitor } from "~/composables/utils/use-process-monitor";
import { schemaAuthDriver, schemaAuthToken } from "~/schemas";
import { AuthApiService } from "~/services/auth/auth-api.service";
import { AuthMemoryService } from "~/services/auth/auth-memory.service";
import type { ICredentials, IUser, TAuthService, TOrNoValue } from "~/types";

export const useAuth = defineStore("store-auth", () => {
  const { $$ } = useNuxtApp();
  const config = useRuntimeConfig().public;
  const {
    services: {
      auth: { defaultsAuthenticate },
    },
  } = useAppConfig();
  const ps = useProcessMonitor();

  const authService: TAuthService<IUser, ICredentials> = $$.get(
    {
      memory: () => new AuthMemoryService(),
      api: () => new AuthApiService(config, defaultsAuthenticate),
    },
    schemaAuthDriver.parse(config.auth.driver),
  )();

  // account data, auth
  const auth = useAsyncData<TOrNoValue<IUser>>(
    "auth-account-data",
    async (_1, { signal }) =>
      authService.token.value
        ? await $$.resolved<IUser>(
            authService.authData(authService.token.value, signal),
          )
        : null,
    {
      server: false,
      immediate: true,
      lazy: true,
      watch: [authService.token],
      default: () => null,
      dedupe: "cancel",
      timeout: defaultsAuthenticate.timeoutMs,
    },
  );

  // map auth to ps
  watch(
    () => [auth.pending.value, auth.error.value] as const,
    ([pending, error]) => {
      ps.setError(error);

      if (pending) {
        if (!ps.processing.value) ps.begin();
        return;
      }

      ps.done();

      if (!ps.processing.value && !ps.error.value) ps.successful();
    },
    { immediate: true },
  );

  const account = computed(() => auth.data.value);
  const isAuth = computed(() => null != $$.get(account.value, "id"));

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
        await authService.init();
        if (!authService.storesAuthToken()) return;
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
    if (!authService.storesAuthToken()) return;
    storageAuth.value = token ?? "";
  });

  const destroy = () => {
    // misc. cleanup
    authService.destroy();
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
    reload: auth.refresh,
    destroy,
  };
});
