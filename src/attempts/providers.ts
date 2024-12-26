import { Provider } from '@nestjs/common';
import {
  ATTEMPT_REPOSITORY,
  ATTEMPT_SERVICE,
  CREATE_ATTEMPT_USECASE,
  GET_ATTEMPTS_USECASE,
  RESOLVE_ATTEMPT_USECASE,
} from './constants';
import { AttemptRepository } from './infrastructure/repositories';
import { AttemptService } from './domain/services/attempt.service';
import { CreateAttemptUsecase } from './application/usecases/create-attempt.usecase';
import { GetAttemptsUsecase, ResolveAttemptUsecase } from './application/usecases';

export const attemptProviders: Provider[] = [
  { provide: ATTEMPT_REPOSITORY, useClass: AttemptRepository },
  { provide: ATTEMPT_SERVICE, useClass: AttemptService },
];

export const usecases: Provider[] = [
  {
    provide: CREATE_ATTEMPT_USECASE,
    useClass: CreateAttemptUsecase,
  },
  {
    provide: GET_ATTEMPTS_USECASE,
    useClass: GetAttemptsUsecase,
  },
  {
    provide: RESOLVE_ATTEMPT_USECASE,
    useClass: ResolveAttemptUsecase,
  },
];
