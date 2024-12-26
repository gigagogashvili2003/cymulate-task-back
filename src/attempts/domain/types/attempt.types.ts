import { ObjectId } from 'mongoose';
import { AttemptStatus } from 'src/attempts/infrastructure/models';

export interface IAttempt {
  id: string;
  receiver: string;
  content: string;
  sender: string;
  status: AttemptStatus;
}

export type AttemptAttributes = IAttempt;
export type AttemptCreationAttributes = Omit<AttemptAttributes, 'id' | 'status'>;
