import { Prisma } from '@prisma/client';
import { HttpStatus } from '@nestjs/common';

import { ExceptionResponseBody } from './exception.entity';

function prismaErrorHandler(
  prismaError:
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientValidationError,
): ExceptionResponseBody {
  if (prismaError instanceof Prisma.PrismaClientKnownRequestError) {
    if (prismaError.code === 'P2025') {
      return {
        message: 'Data Not Found',
        statusCode: HttpStatus.NOT_FOUND,
      };
    } else if (prismaError.code === 'P2003') {
      return {
        message:
          'This data cannot be deleted, because it is related to other data',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    } else {
      return {
        message:
          'Something wrong in the server. Not spesific prisma error. Please contact the developer for quick fix.',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        info: prismaError,
      };
    }
  } else if (prismaError instanceof Prisma.PrismaClientValidationError) {
    return {
      message: 'Input error. Please make sure you submmited all required data',
      statusCode: HttpStatus.BAD_REQUEST,
      info: { ...prismaError, message: prismaError.message },
    };
  } else {
    return {
      message:
        'Something wrong in the server. Not spesific prisma error. Please contact the developer for quick fix.',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      info: prismaError,
    };
  }
}

export { prismaErrorHandler };
