import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailerService } from './mailer.interface';

@Injectable()
export class NodeMailerService implements IMailerService {
  public constructor(private readonly mailerService: MailerService) {}
  public async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      const params = {
        from: 'thegogashvili@gmail.com',
        to,
        subject,
        text,
      };

      return this.mailerService.sendMail(params);
    } catch (err) {
      throw new InternalServerErrorException('FAILED_TO_SEND_EMAIL');
    }
  }
}
