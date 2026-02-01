import type { Ref } from "vue";
import type { Observable } from "rxjs";

import type { TMaybeAsync, TOrNoValue } from "~/types";

export abstract class AuthService<User = unknown, TCredentials = unknown> {
  abstract account$: Observable<TOrNoValue<User>>;
  abstract token: Ref<TOrNoValue<string>>;
  abstract account(idToken?: string): TMaybeAsync<User>;
  abstract authenticate(payload?: TCredentials): TMaybeAsync<string>;
  abstract check(idToken?: string): TMaybeAsync<boolean>;
  abstract logout(user?: User): TMaybeAsync<void>;
  abstract register(payload?: TCredentials): TMaybeAsync<unknown>;
}
