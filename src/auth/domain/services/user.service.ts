import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/auth/constants';
import { IUserRepository } from 'src/auth/infrastructure/interfaces';
import { UserCreationAttributes } from '../types/user.types';

@Injectable()
export class UserService {
  public constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  public findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }

  public create(attrs: UserCreationAttributes) {
    return this.userRepository.createOne(attrs);
  }
}
