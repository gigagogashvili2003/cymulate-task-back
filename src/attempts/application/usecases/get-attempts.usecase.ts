import { UseCase } from '@app/shared/abstracts';
import { IUser } from 'src/auth/domain/types';
import { ATTEMPT_SERVICE } from 'src/attempts/constants';
import { AttemptService } from 'src/attempts/domain/services/attempt.service';
import { Inject } from '@nestjs/common';

export class GetAttemptsUsecase implements UseCase<any, any> {
  public constructor(@Inject(ATTEMPT_SERVICE) private readonly attemptService: AttemptService) {}

  public async execute(_, currentUser?: IUser) {
    return this.attemptService.getAttemptsByUser(currentUser);
  }
}
