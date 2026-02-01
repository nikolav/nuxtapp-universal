import type { TMaybeAsync } from "~/types";

export abstract class AuthService<User = unknown, TCredentials = unknown> {
  abstract isAuthenticated(user?: User): TMaybeAsync<boolean>;
  abstract account(token?: string): TMaybeAsync<User>;
  abstract authenticate(payload?: TCredentials): TMaybeAsync<string>;
  abstract register(payload?: TCredentials): TMaybeAsync<string>;
  abstract logout(user?: User): TMaybeAsync<void>;
}
