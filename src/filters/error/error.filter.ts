import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UsernameAlreadyExists } from 'src/custom-exceptions/user.exception';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // vérifier l'objet erreur pour savoir quel type d'erreur c'est
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof UsernameAlreadyExists) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }

    // récup' l'objet Response "res"
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    response.status(status).json({ message });
  }
}
