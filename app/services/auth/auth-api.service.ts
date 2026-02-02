import { Subject } from "rxjs";
import trim from "lodash/trim";
import get from "lodash/get";
import omit from "lodash/omit";
import type { PublicRuntimeConfig } from "nuxt/schema";

import { AuthService } from "~/services/auth/base";
import { schemaAuthCredentials } from "~/schemas";
import { INTERNAL_AUTH_TOKEN } from "~/config";
import type {
  TOrNoValue,
  ICredentials,
  TUser,
  IAuthenticateOptions,
} from "~/types";

const defaultsAuthenticate: IAuthenticateOptions = {
  timeoutMs: 8122,
};

export class AuthApiService extends AuthService<TUser, ICredentials> {
  private authEndpoint: Record<string, string> = {};
  constructor(private config: PublicRuntimeConfig) {
    super();

    // point auth paths
    const base = [
      trim(config.apiBase, "/"),
      trim(config.auth.endpoint, "/"),
    ].join("/");
    this.authEndpoint.authenticate = `${base}/authenticate`;
    this.authEndpoint.who = `${base}/who`;
    this.authEndpoint.logout = `${base}/logout`;
    this.authEndpoint.register = `${base}/register`;

    // @token, sync
    watchEffect(() => {
      this.access_token.value = this.idToken.value;
    });
    watch(this.idToken, (token) => {
      (async () => {
        try {
          this.account$.next(token ? await this.account(token) : null);
        } catch (error) {
          // pass
        }
      })();
    });
  }

  account$ = new Subject<TOrNoValue<TUser>>();
  idToken = ref<TOrNoValue<string>>(null);
  access_token = ref<TOrNoValue<string>>(null);

  account = async (token: string) => {
    const controller = new AbortController();
    const tid = setTimeout(
      () => controller.abort(),
      defaultsAuthenticate.timeoutMs,
    );

    try {
      const auth = get(
        await $fetch<{ auth: TUser }>(this.authEndpoint.who!, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            ...(this.config.PRODUCTION
              ? {}
              : { "Internal-Auth": INTERNAL_AUTH_TOKEN }),
          },
          signal: controller.signal,
          // GET is idempotent, 1retry is okay, only for transient failures
          retry: 1,
          retryStatusCodes: [429, 503],
          retryDelay: 722,
        }),
        "auth",
      );
      if (!auth) throw new Error("Unauthenticated.");

      return omit(auth, ["password"]);
    } catch (err: any) {
      // rethrow normalized
      if (err?.name === "AbortError") throw new Error("Request timed out.");
      // normalize if server unauthorized
      if (err?.status === 401) throw new Error("Unauthenticated.");
      throw err;
    } finally {
      clearTimeout(tid);
    }
  };

  authenticate = async (
    payload: ICredentials,
    options?: IAuthenticateOptions,
  ) => {
    const _ = Object.assign(
      {},
      defaultsAuthenticate,
      { controller: new AbortController() },
      options,
    );
    const tid = setTimeout(() => _.controller.abort(), _.timeoutMs);
    try {
      const token = get(
        await $fetch<{ access_token?: string }>(
          this.authEndpoint.authenticate!,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              ...(this.config.PRODUCTION
                ? {}
                : { "Internal-Auth": INTERNAL_AUTH_TOKEN }),
            },
            body: schemaAuthCredentials.parse(payload),
            signal: _.controller.signal,
            retry: 0,
          },
        ),
        "access_token",
      );
      if (!token) throw "Auth failed. No token.";

      this.idToken.value = token;
      return token;
    } catch (error) {
      // rethrow
      throw error;
    } finally {
      clearTimeout(tid);
    }
  };

  logout = async () => {
    const token = this.idToken.value;
    if (!token) return;

    const controller = new AbortController();
    const tid = setTimeout(
      () => controller.abort(),
      defaultsAuthenticate.timeoutMs,
    );

    try {
      const res = get(
        await $fetch<{ status: string }>(this.authEndpoint.logout!, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            ...(this.config.PRODUCTION
              ? {}
              : { "Internal-Auth": INTERNAL_AUTH_TOKEN }),
          },
          body: {},
          signal: controller.signal,
          retry: 0,
        }),
        "status",
      );
      if ("ok" !== res) throw new Error("Logout failed.");
    } catch (err: any) {
      if (err?.name === "AbortError") {
        // network timeout: still treat as "logged out" locally
        return;
      }

      // if server says token invalid/expired, user is effectively logged out
      if (err?.status === 401) {
        return;
      }

      throw err;
    } finally {
      clearTimeout(tid);
      // clear local auth state
      this.idToken.value = null;
    }
  };

  register = async (payload: ICredentials) =>
    get(
      await $fetch<{ access_token: string; auth: TUser }>(
        this.authEndpoint.register!,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(this.config.PRODUCTION
              ? {}
              : { "Internal-Auth": INTERNAL_AUTH_TOKEN }),
          },
          body: {
            ...schemaAuthCredentials.parse(payload),
          },
          // abort [s]
          timeout: defaultsAuthenticate.timeoutMs,
          // no retry user create
          retry: 0,
        },
      ),
      "auth.id",
    );
}
