import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IUser } from 'src/auth/domain/types';

export interface RequestWithUser<T extends IUser> extends Request {
  user: T;
}

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request: RequestWithUser<IUser> = ctx.switchToHttp().getRequest();
  return request.user;
});
