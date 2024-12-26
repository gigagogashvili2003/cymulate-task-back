import { Body, Controller, Get, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { SignupUserDto } from '../dtos/signup-user.dto';
import { SIGNIN_USER_USECASE, SIGNUP_USER_USECASE } from 'src/auth/constants';
import { SigninUserUsecase, SignupUserUsecase } from '../usecases';
import { AccessTokenGuard, LocalGuard } from '../guards';
import { CurrentUser } from '@app/shared/decorators';
import { IUser } from 'src/auth/domain/types';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../entities';

@Controller('auth')
export class AuthController {
  public constructor(
    @Inject(SIGNUP_USER_USECASE) private readonly signupUserUsecase: SignupUserUsecase,
    @Inject(SIGNIN_USER_USECASE) private readonly signinUserUsecase: SigninUserUsecase,
  ) {}

  @Post('signup')
  public async signup(@Body() dto: SignupUserDto) {
    await this.signupUserUsecase.execute(dto);
    return { status: HttpStatus.CREATED };
  }

  @Post('signin')
  @UseGuards(LocalGuard)
  public async signin(@CurrentUser() user: IUser) {
    const tokens = await this.signinUserUsecase.execute(user);
    return {
      status: HttpStatus.OK,
      body: {
        tokens: tokens,
      },
    };
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  public me(@CurrentUser() user: IUser) {
    const serialized = plainToInstance(UserEntity, user, { excludeExtraneousValues: true });
    return {
      status: HttpStatus.OK,
      body: {
        user: serialized,
      },
    };
  }
}
