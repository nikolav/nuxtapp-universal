import type { Ref } from "vue";
import type { Subject } from "rxjs";

import type { TMaybeAsync, TOrNoValue } from "~/types";

export abstract class AuthService<User = unknown, TCredentials = unknown> {
  abstract account$: Subject<TOrNoValue<User>>;
  abstract token: Ref<TOrNoValue<string>>;
  abstract account(token?: string): TMaybeAsync<User>;
  abstract authenticate(payload?: TCredentials): TMaybeAsync<string>;
  abstract logout(user?: User): TMaybeAsync<void>;
  abstract register(payload?: TCredentials): TMaybeAsync<unknown>;
}

export abstract class OAuthAuthService<
  User = unknown,
  TCredentials = unknown,
> extends AuthService<User, TCredentials> {
  // popup sign-in, resolve id-token
  abstract signInWithProvider(provider: string): TMaybeAsync<string>;
}
