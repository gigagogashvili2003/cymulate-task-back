import { Expose } from 'class-transformer';

export class UserEntity {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  fullName: string;

  password: string;
}
