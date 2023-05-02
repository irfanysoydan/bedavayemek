import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from '../entities/auth.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Auth => {
    const req = ctx.switchToHttp().getRequest(); // Bu decoratorun amacı request içerisindeki user bilgisini almak.4
    return req.user;
  }
);
