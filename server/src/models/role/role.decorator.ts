import { SetMetadata } from '@nestjs/common';
import { RoleList } from './role-list';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleList[]) => SetMetadata(ROLES_KEY, roles);