import { Inject, Injectable } from '@nestjs/common';
import { USER_SERVICE } from 'src/auth/constants';
import { UserService } from './user.service';
import { InvalidPasswordException, UserNotFoundException } from '@app/shared/exceptions';
import { CryptoUtils } from '@app/shared/utils';
import { JwtService } from '@app/shared/services';
import { EToken } from '@app/shared/enums';
import { TUserJwt } from '@app/shared/types';

@Injectable()
export class AuthService {
  public constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
    @Inject() private readonly jwtService: JwtService,
  ) {}

  public async validateSigninCredentials(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) throw new UserNotFoundException(email);

    const passwordsMatch = await CryptoUtils.comparePassword(password, user.password);

    if (!passwordsMatch) {
      throw new InvalidPasswordException();
    }

    return user;
  }

  public async validate(payload: TUserJwt) {
    const user = await this.userService.findOneByEmail(payload.email);

    if (!user) {
      throw new UserNotFoundException(payload.email);
    }

    return user;
  }

  public signTokens(payload: TUserJwt) {
    return Promise.all([
      this.jwtService.sign(payload, EToken.AccessToken),
      this.jwtService.sign(payload, EToken.RefreshToken),
    ]);
  }
}
