import { Reflector } from '@nestjs/core';
import type { ValidRoles } from '../constants/valid-roles';

export const Roles = Reflector.createDecorator<ValidRoles[]>();
