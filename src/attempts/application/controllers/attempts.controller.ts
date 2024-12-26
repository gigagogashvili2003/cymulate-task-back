import { Body, Controller, Get, HttpStatus, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { CreateAttemptDto } from '../dtos/create-attempts.dto';
import { AccessTokenGuard } from 'src/auth/application/guards';
import { CurrentUser } from '@app/shared/decorators';
import { IUser } from 'src/auth/domain/types';
import { CREATE_ATTEMPT_USECASE, GET_ATTEMPTS_USECASE, RESOLVE_ATTEMPT_USECASE } from 'src/attempts/constants';
import { CreateAttemptUsecase, GetAttemptsUsecase, ResolveAttemptUsecase } from '../usecases';
import { plainToInstance } from 'class-transformer';
import { AttemptEntity } from '../entities';

@Controller('attempts')
export class AttemptsController {
  public constructor(
    @Inject(CREATE_ATTEMPT_USECASE) private readonly createAttemptUsecase: CreateAttemptUsecase,
    @Inject(GET_ATTEMPTS_USECASE) private readonly getAttemptsUsecase: GetAttemptsUsecase,
    @Inject(RESOLVE_ATTEMPT_USECASE) private readonly resolveAttemptUsecase: ResolveAttemptUsecase,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  public async createAttempt(@Body() dto: CreateAttemptDto, @CurrentUser() currentUser: IUser) {
    await this.createAttemptUsecase.execute(dto, currentUser);
    return { status: HttpStatus.CREATED };
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  public async getAttempts(@CurrentUser() currentUser: IUser) {
    const attempts = await this.getAttemptsUsecase.execute(undefined, currentUser);
    const serialized = plainToInstance(AttemptEntity, attempts, { excludeExtraneousValues: true });
    return { status: HttpStatus.OK, body: { attempts: serialized } };
  }

  @Get('fake/:id')
  public async resolve(@Param('id') id: string) {
    await this.resolveAttemptUsecase.execute(id);
    return { status: HttpStatus.OK, message: 'User scammed :D' };
  }
}
