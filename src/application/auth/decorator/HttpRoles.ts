import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@core/common/enum/UserEnums';

export const ROLES_KEY = 'roles';
export const HttpRoles = (...roles : UserRole[]) => SetMetadata('roles', roles);