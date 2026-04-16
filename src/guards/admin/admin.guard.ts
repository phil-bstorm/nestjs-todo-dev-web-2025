import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserRole } from 'src/enums/user-role.enum';
import { Session } from 'src/interfaces/session.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // récupération de la requête depuis le context
    const request: Request & { session?: Session } = context
      .switchToHttp()
      .getRequest();

    // est-ce que le user est admin?
    if (request.session?.role === UserRole.Admin) {
      return true;
    } else {
      return false;
    }
    // return request.session?.role === UserRole.Admin
  }
}
