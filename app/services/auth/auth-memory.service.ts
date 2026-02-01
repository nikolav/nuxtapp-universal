import find from "lodash/find";
import get from "lodash/get";
import { v4 as uuid } from "uuid";
import { Subject } from "rxjs";

import { AuthService } from "./base";
import { Hash } from "~/services/hash";
import { JWT } from "~/services/jwt";
import { cloned } from "~/utils/cloned";
import { schemaJWT } from "~/schemas";
import type { ICredentials, IUser, TOrNoValue } from "~/types";

export class AuthMemoryService extends AuthService<IUser, ICredentials> {
  // users cache, { [id:uuid] => user:IUser }
  private static users = <Record<string, IUser>>{};

  account$ = new Subject<TOrNoValue<IUser>>();
  token = ref<TOrNoValue<string>>(null);

  constructor() {
    super();
    watch(this.token, (token) => {
      (async () => {
        try {
          this.account$.next(null != token ? await this.account(token) : null);
        } catch (error) {
          // pass
        }
      })();
    });
  }

  async account(idToken: string) {
    const id = get(await JWT.verify(idToken), "id");
    const user = AuthMemoryService.users[<any>id];
    if (!user) {
      throw "User not found.";
    }

    return cloned(user);
  }

  async authenticate(payload: ICredentials) {
    const user = AuthMemoryService.byEmail(payload.email);
    if (!(await Hash.check(payload.password, user?.password ?? ""))) {
      throw "Bad credentials.";
    }

    // user valid, login
    const id = user!.id;
    const idToken = schemaJWT.parse(await JWT.sign({ id }));

    this.token.value = idToken;

    return idToken;
  }

  async register(payload: ICredentials) {
    let user = AuthMemoryService.byEmail(payload.email);
    if (user) {
      throw "Bad credentials.";
    }

    // no user with that credentials; create
    const id = uuid();
    user = <IUser>{
      id,
      email: payload.email,
      password: await Hash.make(payload.password),
    };
    AuthMemoryService.users[id] = user;

    return String(id);
  }

  logout() {
    this.token.value = null;
  }

  private static byEmail(email: string) {
    return find(AuthMemoryService.users, (node) => email === node.email);
  }
}
