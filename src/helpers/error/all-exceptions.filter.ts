import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';

import { prismaErrorHandler } from './prisma-exceptions.filter';
import { ExceptionResponseBody } from './exception.entity';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    let responseBody: ExceptionResponseBody = {
      message:
        'Something wrong in the server. Please contact the developer for quick fix.',
      statusCode: httpStatus,
    };

    // Define logic for handle nest or 3rd party lib exception
    if (exception instanceof HttpException) {
      responseBody = {
        message:
          exception.message ||
          'Something wrong in the server. Please contact the developer for quick fix.',
        statusCode: exception.getStatus(),
      };
      httpStatus = exception.getStatus();
    } else if (
      exception instanceof Prisma.PrismaClientKnownRequestError ||
      exception instanceof Prisma.PrismaClientValidationError
    ) {
      const prismaError = prismaErrorHandler(exception);
      responseBody = prismaError;
      httpStatus = prismaError.statusCode;
    } else if (exception instanceof TypeError) {
      console.log(exception);
      responseBody = {
        message: exception.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        info: exception.name,
      };
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
