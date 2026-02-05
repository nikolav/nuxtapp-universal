import type { Ref } from "vue";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth as firebaseAuth } from "~/config/firebase";
import { AuthService } from "./base";
import { schemaAuthCredentials } from "~/schemas";
import type { ICredentials, IUser, TOrNoValue } from "~/types";

export class AuthFirebaseService extends AuthService<
  IUser<string>,
  ICredentials
> {
  token: Ref<TOrNoValue<string>> = ref();
  _user = ref<TOrNoValue<IUser<string>>>();

  constructor() {
    super();

    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        this._user.value = { ...user, id: user.uid, email: user?.email ?? "" };
        this.token.value = await user.getIdToken();
        return;
      }
      this._user.value = null;
      this.token.value = null;
    });
  }

  authData() {
    return this._user.value;
  }

  authenticate = async (payload: ICredentials) => {
    const creds = schemaAuthCredentials.parse(payload);
    const token = await (
      await signInWithEmailAndPassword(
        firebaseAuth,
        creds.email,
        creds.password,
      )
    ).user.getIdToken();
    this.token.value = token;
    return token;
  };

  logout = async () => {
    await signOut(firebaseAuth);
  };

  register = async (payload: ICredentials) => {
    const creds = schemaAuthCredentials.parse(payload);
    return await createUserWithEmailAndPassword(
      firebaseAuth,
      creds.email,
      creds.password,
    );
  };
}
