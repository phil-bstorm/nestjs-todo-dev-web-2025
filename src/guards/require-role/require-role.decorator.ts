import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/enums/user-role.enum';
import { RequireRoleGuard } from './require-role.guard';

export const RequireRole = (...args: UserRole[]) =>
  applyDecorators(
    SetMetadata('require-role', args),
    UseGuards(RequireRoleGuard),
  );
