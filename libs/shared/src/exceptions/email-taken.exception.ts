import { ConflictException } from '@nestjs/common';

export class EmailTakenException extends ConflictException {
  public constructor(email?: string) {
    super(`Email: ${email} is taken!`);
  }
}
