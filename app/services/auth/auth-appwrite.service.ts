import { ID } from "appwrite";
import type { Account } from "appwrite";
import get from "lodash/get";

import { AuthService } from "~/services/auth/base";

import type { ICredentials, IUser, TOrNoValue } from "~/types";

export class AuthAppWriteService extends AuthService<
  IUser<string>,
  ICredentials
> {
  token = ref<TOrNoValue<string>>(null);

  constructor(protected account: Account) {
    super();
  }

  async authData() {
    const auth = await this.account.get();
    return <IUser<string>>{ ...auth, id: auth.$id };
  }
  async authenticate(payload: ICredentials) {
    const sessionId = get(
      await this.account.createEmailPasswordSession(payload),
      "$id",
    );
    this.token.value = sessionId;
    return sessionId;
  }
  async logout() {
    if (this.token.value) {
      await this.account.deleteSession({ sessionId: this.token.value });
    }
    this.token.value = null;
  }
  async register(payload: ICredentials) {
    return get(
      await this.account.create({
        userId: ID.unique(),
        ...payload,
      }),
      "$id",
    );
  }
}
