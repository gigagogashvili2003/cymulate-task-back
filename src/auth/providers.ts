import { Provider } from '@nestjs/common';
import { AUTH_SERVICE, SIGNIN_USER_USECASE, SIGNUP_USER_USECASE, USER_REPOSITORY, USER_SERVICE } from './constants';
import { AuthService } from './domain/services';
import { SigninUserUsecase, SignupUserUsecase } from './application/usecases';
import { UserService } from './domain/services/user.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { AccessTokenStrategy, LocalStrategy, RefreshTokenStrategy } from './application/strategies';

export const authProviders: Provider[] = [
  { provide: AUTH_SERVICE, useClass: AuthService },
  { provide: USER_SERVICE, useClass: UserService },
  { provide: USER_REPOSITORY, useClass: UserRepository },
];

export const strategies: Provider[] = [LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy];

export const usecases: Provider[] = [
  { provide: SIGNUP_USER_USECASE, useClass: SignupUserUsecase },
  { provide: SIGNIN_USER_USECASE, useClass: SigninUserUsecase },
];
