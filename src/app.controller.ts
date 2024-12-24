import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  public getHello(): string {
    return 'Hello World!!';
  }
}
