import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from './roles.guard';
import { RequestWithUser } from '@/shared/interfaces/request-with-user.interface';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    if (!request.user) {
      throw new ForbiddenException('User not found in request context.');
    }

    const userRoles = request.user.roles;

    const evaluation = roles.every((role) => userRoles.includes(role));

    if (!evaluation) {
      throw new ForbiddenException('User does not have the necessary roles.');
    }

    return evaluation;
  }
}
