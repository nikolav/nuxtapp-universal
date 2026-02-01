import bcrypt from "bcryptjs";

export class Hash {
  static make(pwd: string) {
    return bcrypt.hashSync(pwd, 12);
  }
  static check(pwd: string, hash: string) {
    return bcrypt.compareSync(pwd, hash);
  }
}
