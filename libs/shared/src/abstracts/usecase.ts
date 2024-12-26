import { IUser } from 'src/auth/domain/types';

export interface UseCase<IRequest, IResponse> {
  execute(request?: IRequest, currentUser?: IUser): Promise<IResponse> | IResponse;
}
