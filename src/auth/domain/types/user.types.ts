import { ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  fullName: string;
  email: string;
  password: string;
}

export type UserAttributes = IUser;
export type UserCreationAttributes = Omit<UserAttributes, '_id'>;
