import type { Ref } from "vue";
import type { Observable } from "rxjs";

import type { TMaybeAsync, TOrNoValue } from "~/types";

export abstract class AuthService<User = unknown, TCredentials = unknown> {
  abstract account$: Observable<TOrNoValue<User>>;
  abstract token: Ref<TOrNoValue<string>>;
  abstract account(token?: string): TMaybeAsync<User>;
  abstract authenticate(payload?: TCredentials): TMaybeAsync<string>;
  abstract register(payload?: TCredentials): TMaybeAsync<string>;
  abstract logout(user?: User): TMaybeAsync<void>;
}
