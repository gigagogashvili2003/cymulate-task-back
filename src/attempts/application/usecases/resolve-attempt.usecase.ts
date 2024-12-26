import { UseCase } from '@app/shared/abstracts';
import { ATTEMPT_SERVICE } from 'src/attempts/constants';
import { AttemptService } from 'src/attempts/domain/services/attempt.service';
import { Inject, NotFoundException } from '@nestjs/common';
import { AttemptStatus } from 'src/attempts/infrastructure/models';

export class ResolveAttemptUsecase implements UseCase<string, any> {
  public constructor(@Inject(ATTEMPT_SERVICE) private readonly attemptService: AttemptService) {}

  public async execute(request: string) {
    const attempt = await this.attemptService.findOneById(request);

    if (!attempt) {
      throw new NotFoundException('Attempt not found');
    }

    await attempt.updateOne({ $set: { status: AttemptStatus.Clicked } });
  }
}
