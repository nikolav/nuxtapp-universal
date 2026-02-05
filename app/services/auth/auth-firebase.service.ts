import type { Ref } from "vue";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import type { Unsubscribe } from "firebase/auth";

import {
  auth as firebaseAuth,
  firebaseOAuthProviders,
} from "~/config/firebase";
import { AuthService } from "./base";
import {
  schemaAuthCredentials,
  schemaOAuthProviders,
  transformFirebaseUser,
} from "~/schemas";
import { onDebug } from "~/utils/on-debug";
import type { ICredentials, IUser, TOrNoValue } from "~/types";

export class AuthFirebaseService extends AuthService<
  IUser<string>,
  ICredentials
> {
  token: Ref<TOrNoValue<string>> = ref();

  _user = ref<TOrNoValue<IUser<string>>>();
  // keep subscriptions to cleanup
  _onAuthStateChanged_s: TOrNoValue<Unsubscribe>;

  authData() {
    return this._user.value!;
  }

  authenticate = async (payload: ICredentials) => {
    const creds = schemaAuthCredentials.parse(payload);
    await signInWithEmailAndPassword(firebaseAuth, creds.email, creds.password);
    // skip @token auth
    // delegate to onAuthStateChanged
    return "";
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

  // cleanup subscription
  override destroy() {
    this._onAuthStateChanged_s?.();
  }

  // let firebase handle auth @reloads
  override storesAuthToken() {
    return false;
  }

  // @ready init
  override async init() {
    this._onAuthStateChanged_s = onAuthStateChanged(firebaseAuth, (user) => {
      onDebug({ "firebase:auth": user });

      if (user) {
        this._user.value = transformFirebaseUser.parse(user);
        return user.getIdToken().then((token) => {
          this.token.value = token;
        });
      }

      this.token.value = null;
    });
  }

  signInWithProvider = async (provider: string) => {
    const { user } = await signInWithPopup(
      firebaseAuth,
      firebaseOAuthProviders[schemaOAuthProviders.parse(provider)],
    );
    return await user.getIdToken();
  };
}
