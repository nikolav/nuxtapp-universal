import find from "lodash/find";
import get from "lodash/get";
import omit from "lodash/omit";
import { v4 as uuid } from "uuid";
import { Subject } from "rxjs";

import { AuthService } from "./base";
import { Hash } from "~/services/hash";
import { JWT } from "~/services/jwt";
import { cloned } from "~/utils/cloned";
import { schemaAuthCredentials, schemaJWT } from "~/schemas";
import type { ICredentials, IUser, TOrNoValue } from "~/types";

type TUser = IUser<string> & { key: string };
export class AuthMemoryService extends AuthService<TUser, ICredentials> {
  // users cache, { [id:uuid] => user:TUser }
  private static users = <Record<string, TUser>>{};

  account$ = new Subject<TOrNoValue<TUser>>();
  idToken = ref<TOrNoValue<string>>(null);
  access_token = ref<TOrNoValue<string>>(null);

  constructor() {
    super();
    watchEffect(() => {
      this.access_token.value = this.idToken.value;
    });
    watch(this.idToken, (idToken_) => {
      (async () => {
        try {
          this.account$.next(
            null != idToken_ ? await this.account(idToken_) : null,
          );
        } catch (error) {
          // pass
        }
      })();
    });
  }

  account = async (idToken: string) => {
    const id = get(await JWT.verify(idToken), "id");
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

    this.idToken.value = idToken;

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
    user = <TUser>{
      id,
      key: uuid(),
      email: credentials.email,
      password: await Hash.make(credentials.password),
    };
    AuthMemoryService.users[id] = user;

    return id;
  };

  logout = async () => {
    this.idToken.value = null;
  };

  private static byEmail(email: string) {
    return find(AuthMemoryService.users, (node) => email === node.email);
  }
}
