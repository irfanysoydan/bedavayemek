import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from '../entities/auth.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (_data, context: ExecutionContext): Auth => {
    const ctx = GqlExecutionContext.create(context);

    const user = ctx.getContext().req.user;
    return user;
  }
);
