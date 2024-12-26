import { IsEmail, IsStrongPassword } from 'class-validator';

export class SigninUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
