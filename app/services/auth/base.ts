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

  // start/setup service
  async init() {}
  // override to do cleanup @service:destroyed
  destroy() {}
  // false @overrides for custom auth token handling for app hard reloads
  //   firebase auto reloads auth state @reloads
  storesAuthToken() {
    return true;
  }
}
