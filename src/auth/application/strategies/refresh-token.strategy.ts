import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../domain/services';
import { AUTH_SERVICE } from '../../constants';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh_token') {
  constructor(
    private readonly configService: ConfigService,
    @Inject(AUTH_SERVICE) private readonly authService: AuthService,
  ) {
    super({
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: any) {}
}
