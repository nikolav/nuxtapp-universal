import find from "lodash/find";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { v4 as uuid } from "uuid";

import { AuthService } from "./base";
import { Hash } from "~/services/hash";
import { JWT } from "~/services/jwt";
import { cloned } from "~/utils/cloned";
import type { ICredentials, IUser } from "~/types";

export class AuthMemoryService extends AuthService<IUser, ICredentials> {
  // users cache, { [id:uuid] => user:IUser }
  private static users = <Record<string, IUser>>{};
  // tokens cache, { [id:uuid] => tokens:Set }
  private static tokens = <Record<string, Set<string>>>{};

  account(idToken: string) {
    return new Promise<IUser>((resolve, reject) => {
      (async () => {
        try {
          const id = get(await JWT.verify(idToken), "id");
          const user = AuthMemoryService.users[<any>id];
          if (!user) {
            throw "User not found.";
          }

          return resolve(cloned(user));
        } catch (error) {
          // pass
        }
        reject(null);
      })();
    });
  }

  authenticate(payload: ICredentials) {
    const auth = this;
    return new Promise<string>((resolve, reject) => {
      (async () => {
        try {
          const user = auth.byEmail(payload.email);
          if (!Hash.check(payload.password, user?.password ?? "")) {
            throw "Bad credentials.";
          }
          // user valid, login
          const id = user!.id;
          const idToken = await JWT.sign({ id });
          AuthMemoryService.tokens[id]!.add(idToken);

          return resolve(idToken);
        } catch (error) {
          // pass
        }
        reject(null);
      })();
    });
  }

  register(payload: ICredentials) {
    const auth = this;
    return new Promise<string>((resolve, reject) => {
      (async () => {
        try {
          let user = auth.byEmail(payload.email);
          if (user) {
            throw "Bad credentials.";
          }
          // no user with that credentials; create
          const id = uuid();
          const idToken = await JWT.sign({ id });

          user = <IUser>{
            id,
            email: payload.email,
            password: Hash.make(payload.password),
          };
          AuthMemoryService.users[id] = user;

          AuthMemoryService.tokens[id] ??= new Set<string>();
          AuthMemoryService.tokens[id].add(idToken);

          return resolve(idToken);
        } catch (error) {
          // pass
        }
        reject(null);
      })();
    });
  }

  logout(user: IUser) {
    AuthMemoryService.tokens[user.id]?.clear();
  }

  isAuthenticated(user: IUser) {
    return !isEmpty(AuthMemoryService.tokens[user.id]);
  }

  private byEmail(email: string) {
    return find(AuthMemoryService.users, (node) => email === node.email);
  }
}
