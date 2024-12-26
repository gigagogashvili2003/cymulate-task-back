import { NotFoundException } from '@nestjs/common';

export class ReceiverNotFoundException extends NotFoundException {
  constructor(email: string) {
    super(`Receiver with email ${email} not found`);
  }
}
