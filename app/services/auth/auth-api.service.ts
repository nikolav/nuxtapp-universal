import { Subject } from "rxjs";
import { OAuthAuthService } from "~/services/auth/base";

import type { TOrNoValue, ICredentials, TUser } from "~/types";

export class AuthApiService extends OAuthAuthService<TUser, ICredentials> {
  account$ = new Subject<TOrNoValue<TUser>>();
  idToken = ref<TOrNoValue<string>>(null);
  access_token = ref<TOrNoValue<string>>(null);

  account = async (idToken: string) => {
    return <TUser>{};
  };
  authenticate = async (payload: ICredentials) => {
    return "";
  };
  signInWithProvider(provider: string) {
    return "";
  }
  logout = async () => {};
  register = async (payload: ICredentials) => {};
}
