import bcrypt from "bcrypt";

export class Password {
  static async toHash(password: string) {
    return await bcrypt.hash(password, 12);
  }

  static async comparePassword(
    storedPassword: string,
    suppliedPassword: string,
  ) {
    return await bcrypt.compare(storedPassword, suppliedPassword);
  }
}
