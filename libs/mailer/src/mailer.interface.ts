export interface IMailerService {
  sendEmail(to: string, subject: string, text: string): Promise<void>;
}
