import bcrypt from "bcryptjs";

export class Hash {
  static async make(pwd: string) {
    return await bcrypt.hash(pwd, 12);
  }
  static async check(pwd: string, hash: string) {
    return await bcrypt.compare(pwd, hash);
  }
}
