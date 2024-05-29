import { User } from '@/modules/users/entities/user.entity';
import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

interface RequestWithUser extends Request {
  user: User;
}

type UserProperty = keyof InstanceType<typeof User>;

export const GetUser = createParamDecorator(
  (data: UserProperty | Array<UserProperty>, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      throw new InternalServerErrorException(
        'User not found in request context.',
      );
    }

    if (data) {
      if (Array.isArray(data)) {
        return data.reduce((acc, key) => {
          acc[key] = user[key];
          return acc;
        }, {});
      }

      return user[data];
    }

    return user;
  },
);
