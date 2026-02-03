import { ReplaySubject } from "rxjs";
import trim from "lodash/trim";
import get from "lodash/get";
import omit from "lodash/omit";
import type { PublicRuntimeConfig } from "nuxt/schema";

import { AuthService } from "~/services/auth/base";
import { schemaAuthCredentials, schemaAuthToken } from "~/schemas";
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

  account$ = new ReplaySubject<TOrNoValue<TUser>>();
  token = ref<TOrNoValue<string>>(null);

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
  }

  account = async (token: string) =>
    omit(
      get(
        await $fetch<{ auth: TUser }>(this.authEndpoint.who!, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            ...this.headersBase(),
          },
          timeout: defaultsAuthenticate.timeoutMs,
          retry: 1,
          retryStatusCodes: [429, 503],
          retryDelay: 812,
        }),
        "auth",
      ),
      ["password"],
    );

  authenticate = async (
    payload: ICredentials,
    options?: IAuthenticateOptions,
  ) => {
    const token = schemaAuthToken.parse(
      get(
        await $fetch<{ access_token?: string }>(
          this.authEndpoint.authenticate!,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...this.headersBase(),
            },
            body: schemaAuthCredentials.parse(payload),
            signal: options?.controller?.signal,
            timeout: options?.timeoutMs ?? defaultsAuthenticate.timeoutMs,
            retry: 0,
          },
        ),
        "access_token",
      ),
    );
    this.token.value = token;

    return token;
  };

  logout = async () => {
    const token = this.token.value;
    if (!token) return;

    try {
      if (
        "ok" !==
        get(
          await $fetch<{ status: string }>(this.authEndpoint.logout!, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              ...this.headersBase(),
            },
            body: {},
            timeout: defaultsAuthenticate.timeoutMs,
            retry: 0,
          }),
          "status",
        )
      )
        throw new Error("Logout failed.");
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
      // clear auth state
      this.token.value = null;
    }
  };

  register = async (payload: ICredentials, options?: IAuthenticateOptions) =>
    get(
      await $fetch<{ access_token: string; auth: TUser }>(
        this.authEndpoint.register!,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...this.headersBase(),
          },
          body: schemaAuthCredentials.parse(payload),
          signal: options?.controller?.signal,
          timeout: options?.timeoutMs ?? defaultsAuthenticate.timeoutMs,
          retry: 0,
        },
      ),
      "auth.id",
    );

  private headersBase() {
    return {
      Accept: "application/json",
      ...(this.config.PRODUCTION
        ? {}
        : { "Internal-Auth": INTERNAL_AUTH_TOKEN }),
    };
  }
}
