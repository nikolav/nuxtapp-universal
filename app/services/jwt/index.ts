import * as jose from "jose";

import { JWT_SECRET } from "~/config";

export class JWT {
  private static JWT_SECRET = new TextEncoder().encode(JWT_SECRET);
  private static defaultExpiresIn = "10d";

  static async sign(payload: any) {
    return await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(JWT.defaultExpiresIn)
      .sign(JWT.JWT_SECRET);
  }

  static async verify(token: string) {
    const { payload } = await jose.jwtVerify(token, JWT.JWT_SECRET);
    return payload;
  }
}
