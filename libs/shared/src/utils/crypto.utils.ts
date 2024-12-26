import * as bcrypt from 'bcrypt';

export class CryptoUtils {
  public static comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
  public static async hashPassword(payload: string, saltValue = 10) {
    const salt = await CryptoUtils.generateSaltValue(saltValue);
    return await bcrypt.hash(payload, salt);
  }
  private static generateSaltValue(saltValue: number) {
    return bcrypt.genSalt(saltValue);
  }
}
