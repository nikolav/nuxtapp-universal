import { tryOnScopeDispose } from "@vueuse/shared";
import { tap } from "rxjs/operators";

import type { ICredentials, IUser, TAuthService, TOrNoValue } from "~/types";
import { schemaAuthDriver, schemaAuthToken } from "~/schemas";
import { isPresent } from "~/utils/is-present";
import { AuthFirebaseService } from "~/services/auth/auth-firebase.service";
import { AuthApiService } from "~/services/auth/auth-api.service";
import { AuthMemoryService } from "~/services/auth/auth-memory.service";
import { useProcessMonitor } from "~/composables/utils/use-process-monitor";
import { usePopupOAuth } from "~/composables/auth/use-popup-oauth";

export const useAuth = defineStore("store-auth", () => {
  const { $$ } = useNuxtApp();
  const config = useRuntimeConfig().public;
  const {
    services: {
      auth: { defaultsAuthenticate },
    },
  } = useAppConfig();
  const ps = useProcessMonitor();

  const service: TAuthService<IUser, ICredentials> = $$.get(
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
      service.token.value
        ? await $$.resolved<IUser>(
            service.authData(service.token.value, signal),
          )
        : null,
    {
      server: false,
      immediate: true,
      lazy: true,
      watch: [service.token],
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
    ps.monitor(() => service.authenticate(credenitals));

  const logout = () => ps.monitor<void>(() => service.logout());

  const register = (credentials: ICredentials) =>
    ps.monitor(() => service.register(credentials));

  const { signInWithProvider: signInWithProviderBase_ } = usePopupOAuth();
  const signInWithProvider = (provider: string) =>
    ps.monitor(() => {
      switch (true) {
        case service instanceof AuthFirebaseService:
          return service.signInWithProvider(provider);

        default:
          return signInWithProviderBase_(provider).pipe(
            tap((token) => {
              service.token.value = token;
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
        await service.init();
        if (!service.storesAuthToken()) return;
        try {
          if (storageAuth.value)
            service.token.value = schemaAuthToken.parse(storageAuth.value);
        } catch (error) {
          // pass
        }
      })();
    });
  });

  // @auth; sync storage auth token
  watch(service.token, (token) => {
    if (!service.storesAuthToken()) return;
    storageAuth.value = token ?? "";
  });

  const destroy = () => {
    // misc. cleanup
    service.destroy();
  };

  tryOnScopeDispose(destroy);

  return {
    status: ps,
    token: service.token,
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
