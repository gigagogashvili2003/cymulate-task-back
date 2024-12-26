import { IsEmail, IsString } from 'class-validator';

export class CreateAttemptDto {
  @IsEmail()
  receiver: string;

  @IsString()
  content: string;
}
