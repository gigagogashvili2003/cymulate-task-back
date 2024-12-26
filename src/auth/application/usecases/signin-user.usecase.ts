import { UseCase } from '@app/shared/abstracts';
import { Inject } from '@nestjs/common';
import { AUTH_SERVICE } from 'src/auth/constants';
import { AuthService } from 'src/auth/domain/services';
import { IUser } from 'src/auth/domain/types';

export class SigninUserUsecase implements UseCase<IUser, { accessToken: string; refreshToken: string }> {
  public constructor(@Inject(AUTH_SERVICE) private readonly authService: AuthService) {}

  public async execute(request?: IUser) {
    const { _id, email } = request;
    const [accessToken, refreshToken] = await this.authService.signTokens({
      sub: _id.toString(),
      email: email,
    });

    return { accessToken, refreshToken };
  }
}
