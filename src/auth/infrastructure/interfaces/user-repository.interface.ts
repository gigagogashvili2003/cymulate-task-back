import { UserCreationAttributes } from 'src/auth/domain/types/user.types';
import { UserDocument } from '../models';

export interface IUserRepository {
  findOneByEmail(email: string): Promise<UserDocument>;
  createOne(attrs: UserCreationAttributes): Promise<UserDocument>;
}
