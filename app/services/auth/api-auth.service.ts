import { Subject } from "rxjs";

import { AuthService } from "./base";
import type { ICredentials, IUser, TOrNoValue } from "~/types";

export class AuthApiService extends AuthService<IUser, ICredentials> {
  account$ = new Subject<TOrNoValue<IUser>>();
  idToken = ref<TOrNoValue<string>>(null);
  access_token = ref<TOrNoValue<string>>(null);

  account = async (idToken: string) => {
    return <IUser>{};
  };
  authenticate = async (payload: ICredentials) => {
    return "";
  };
  logout = async () => {};
  register = async (payload: ICredentials) => {};
}
