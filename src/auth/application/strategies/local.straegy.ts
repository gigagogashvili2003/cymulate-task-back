import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable } from '@nestjs/common';
import { AUTH_SERVICE } from '../../constants';
import { AuthService } from '../../domain/services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  public constructor(@Inject(AUTH_SERVICE) private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  public validate(email: string, password: string) {
    return this.authService.validateSigninCredentials(email, password);
  }
}
