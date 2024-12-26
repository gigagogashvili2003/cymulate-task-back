import { AttemptCreationAttributes } from 'src/attempts/domain/types';
import { AttemptDocument } from '../models';
import { IUser } from 'src/auth/domain/types';

export interface IAttemptRepository {
  createOne(attempt: AttemptCreationAttributes): Promise<AttemptDocument>;
  getManyByUser(user: IUser): Promise<AttemptDocument[]>;
  findOneById(id: string): Promise<AttemptDocument>;
}
