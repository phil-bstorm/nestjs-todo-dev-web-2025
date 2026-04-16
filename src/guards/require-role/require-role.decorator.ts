import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/enums/user-role.enum';
import { RequireRoleGuard } from './require-role.guard';
import { ApiResponse } from '@nestjs/swagger';

export const RequireRole = (...args: UserRole[]) =>
  applyDecorators(
    SetMetadata('require-role', args),
    UseGuards(RequireRoleGuard),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
  );
