import { ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Catch } from '@nestjs/common';
import { ResponseEntity } from '../types/response.type';
import { Response } from 'express';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const resolved = this.resolve(exception);
    return res.status(resolved.status).json({
      ...resolved.response,
    });
  }

  private resolve(exception: TypeORMError): {
    status: HttpStatus;
    response: ResponseEntity<null>;
  } {
    if (exception instanceof EntityNotFoundError)
      return {
        status: HttpStatus.NOT_FOUND,
        response: { success: false, error: exception.message, data: null },
      };
    if (exception instanceof QueryFailedError)
      return {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        response: {
          success: false,
          error: exception.driverError as string,
          data: null,
        },
      };
    // default
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      response: {
        success: false,
        error: exception.message,
        data: null,
      },
    };
  }
}
