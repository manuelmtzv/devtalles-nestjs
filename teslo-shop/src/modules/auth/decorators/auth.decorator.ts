import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles, UserRoleGuard } from '../guards';
import { AuthGuard } from '@nestjs/passport';
import type { ValidRoles } from '../constants/valid-roles';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  );
}
