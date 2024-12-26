import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignupUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  public email: string;

  @IsStrongPassword()
  password: string;
}
