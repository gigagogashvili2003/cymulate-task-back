import { Inject, Injectable } from '@nestjs/common';
import { ATTEMPT_REPOSITORY } from 'src/attempts/constants';
import { IAttemptRepository } from 'src/attempts/infrastructure/interfaces';
import { AttemptCreationAttributes } from '../types';
import { IUser } from 'src/auth/domain/types';

@Injectable()
export class AttemptService {
  public constructor(@Inject(ATTEMPT_REPOSITORY) private readonly attemptRepository: IAttemptRepository) {}

  public findOneById(id: string) {
    return this.attemptRepository.findOneById(id);
  }

  public create(attempt: AttemptCreationAttributes) {
    return this.attemptRepository.createOne(attempt);
  }

  public getAttemptsByUser(user: IUser) {
    return this.attemptRepository.getManyByUser(user);
  }
}
