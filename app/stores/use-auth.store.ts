import { onScopeDispose } from "vue";
import { tap } from "rxjs/operators";

import { isPresent } from "~/utils/is-present";
import { usePopupOAuth } from "~/composables/auth/use-popup-oauth";
import { useProcessMonitor } from "~/composables/utils/use-process-monitor";
import { schemaAuthDriver, schemaAuthToken } from "~/schemas";
import { AuthFirebaseService } from "~/services/auth/auth-firebase.service";
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
      firebase: () => new AuthFirebaseService(),
    },
    schemaAuthDriver.parse(config.auth.driver),
  )();

  // account data, auth
  const auth = useAsyncData<TOrNoValue<IUser>>(
    "auth-account-data",
    async (_nuxtApp, { signal }) =>
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
  ps.sync(auth.pending, auth.error);

  const account = computed(() => auth.data.value);
  const isAuth = computed(() => isPresent($$.get(account.value, "id")));

  const authenticate = (credenitals: ICredentials) =>
    ps.monitor(() => authService.authenticate(credenitals));

  const logout = () => ps.monitor<void>(() => authService.logout());

  const register = (credentials: ICredentials) =>
    ps.monitor(() => authService.register(credentials));

  const { signInWithProvider: signInWithProviderBase_ } = usePopupOAuth();
  const signInWithProvider = async (provider: string) =>
    ps.monitor(() => {
      switch (true) {
        case authService instanceof AuthFirebaseService:
          return authService.signInWithProvider(provider);

        default:
          return signInWithProviderBase_(provider).pipe(
            tap((token) => {
              authService.token.value = token;
            }),
          );
      }
    });

  // cache token to autoload auth
  const storageAuth = useLocalStorage(
    useAppConfig().keys.TOKEN_API_AUTH,
    () => "",
  );

  // @boot
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
