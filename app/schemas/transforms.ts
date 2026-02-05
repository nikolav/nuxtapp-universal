import { z } from "zod";
import type { User } from "firebase/auth";

import type { IUser } from "~/types";

export const transformFirebaseUser = z.transform((user: User) => {
  return <IUser<string>>{ ...user, id: user.uid, email: user?.email ?? "" };
});
