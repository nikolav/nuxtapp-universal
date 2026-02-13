import find from "lodash/find";
import get from "lodash/get";
import omit from "lodash/omit";
import { v4 as uuid } from "uuid";

import { AuthService } from "./base";
import { Hash } from "~/services/hash";
import { JWT } from "~/services/jwt";
import { cloned } from "~/utils/cloned";
import { schemaAuthCredentials, schemaJWT } from "~/schemas";
import type { ICredentials, IUser, TOrNoValue } from "~/types";

export class AuthMemoryService extends AuthService<
  IUser<string>,
  ICredentials
> {
  // users cache, { [id:uuid] => user:IUser<string> }
  private static users = <Record<string, IUser<string>>>{};

  token = ref<TOrNoValue<string>>(null);

  authData = async (token: string) => {
    const id = get(await JWT.verify(token), "id");
    const user = AuthMemoryService.users[<any>id];
    if (!user) {
      throw "User not found.";
    }

    return cloned(omit(user, ["password"]));
  };

  authenticate = async (payload: ICredentials) => {
    const credentials = schemaAuthCredentials.parse(payload);
    const user = AuthMemoryService.byEmail(credentials.email);
    if (!(await Hash.check(credentials.password, user?.password ?? ""))) {
      throw "Bad credentials.";
    }

    // user valid, login
    const id = user!.id;
    const idToken = schemaJWT.parse(await JWT.sign({ id }));

    this.token.value = idToken;

    return idToken;
  };

  register = async (payload: ICredentials) => {
    const credentials = schemaAuthCredentials.parse(payload);
    let user = AuthMemoryService.byEmail(credentials.email);
    if (user) {
      throw "Bad credentials.";
    }

    // no user with that credentials; create
    const id = uuid();
    user = <IUser<string>>{
      id,
      email: credentials.email,
      password: await Hash.make(credentials.password),
    };
    AuthMemoryService.users[id] = user;

    return id;
  };

  logout = async () => {
    this.token.value = null;
  };

  private static byEmail(email: string) {
    return find(AuthMemoryService.users, (node) => email === node.email);
  }
}
