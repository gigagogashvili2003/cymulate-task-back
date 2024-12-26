export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

export type UserAttributes = IUser;
export type UserCreationAttributes = Omit<UserAttributes, 'id'>;
