import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/entities/user.entity'; // Import your User entity

export const UserDecorator = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    //   get info from session
    const session = ctx.switchToHttp().getRequest().session;
    const userId: number = session.user_id;

    const usr = new User();
    usr.userId = userId;

    return usr;
  },
);
