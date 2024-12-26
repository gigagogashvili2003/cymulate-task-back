import { Expose, Transform } from 'class-transformer';
import { AttemptStatus } from 'src/attempts/infrastructure/models';

export class AttemptEntity {
  @Expose()
  @Transform(({ value }) => value.toString())
  _id: string;

  @Expose()
  sender: string;

  @Expose()
  receiver: string;

  @Expose()
  content: string;

  @Expose()
  status: AttemptStatus;
}
