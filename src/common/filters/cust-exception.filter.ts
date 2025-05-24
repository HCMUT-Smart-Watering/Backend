import { ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Catch } from '@nestjs/common';
import { CustomError } from '../errors/CustomError.error';
import { ResponseEntity } from '../types/response.type';
import { Response } from 'express';

@Catch(CustomError)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: CustomError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const resolved = this.resolve(exception);
    return res.status(resolved.status).json({
      ...resolved.response,
    });
  }

  private resolve(exception: CustomError): {
    status: HttpStatus;
    response: ResponseEntity<null>;
  } {
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
