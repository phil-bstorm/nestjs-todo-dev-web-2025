import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserRole } from 'src/enums/user-role.enum';
import { Session } from 'src/interfaces/session.interface';

@Injectable()
export class RequireRoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this._reflector.get<UserRole[]>(
      'require-role',
      context.getHandler(),
    );

    const req: Request & { session?: Session } = context
      .switchToHttp()
      .getRequest();

    // est-ce que l'utilisateur est connecté?
    if (!req.session) {
      return false;
    }

    // est-ce que l'utilisateur (connecté) à besoin de rôle?
    if (!roles || roles.length === 0) {
      return true;
    }

    // est-ce que l'utilisateur (connecté) possède au moins un des rôles
    if (
      req.session.role === UserRole.Admin ||
      roles.includes(req.session.role)
    ) {
      return true;
    }

    return false;
  }
}
