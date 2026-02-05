import type { Ref } from "vue";

import type { TMaybeAsync, TOrNoValue } from "~/types";

export abstract class AuthService<User = unknown, TCredentials = unknown> {
  abstract token: Ref<TOrNoValue<string>>;
  abstract authData(
    token?: string,
    signal?: globalThis.AbortSignal,
  ): TMaybeAsync<User>;
  abstract authenticate(payload?: TCredentials): TMaybeAsync<string>;
  abstract logout(user?: User): TMaybeAsync<void>;
  abstract register(payload?: TCredentials): TMaybeAsync<unknown>;
  // override to do cleanup @service:destroyed
  destroy = () => {};
}

export abstract class OAuthAuthService<
  User = unknown,
  TCredentials = unknown,
> extends AuthService<User, TCredentials> {
  // popup sign-in, resolve id-token
  abstract signInWithProvider(provider: string): TMaybeAsync<string>;
}
