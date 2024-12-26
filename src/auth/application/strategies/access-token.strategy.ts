import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../domain/services';
import { AUTH_SERVICE } from '../../constants';
import { TUserJwt } from '@app/shared/types';
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access_token') {
  constructor(
    private readonly configService: ConfigService,
    @Inject(AUTH_SERVICE) private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    });
  }

  public validate(payload: TUserJwt) {
    return this.authService.validate(payload);
  }
}
