import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { Session } from 'src/interfaces/session.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly _jwtService: JwtService) {}

  use(req: Request & { session: Session }, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization; // bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzYyNjIzMTIsImV4cCI6MTc3NjM0ODcxMn0
    if (!bearerToken) {
      next();
      return;
    }

    const [type, token] = bearerToken.split(' ');
    if (type.toLowerCase() !== 'bearer') {
      throw new UnauthorizedException('Invalid type');
    }

    try {
      const session = this._jwtService.verify<Session>(token);
      req.session = session;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
