import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';

import { AuthUser, RequestWithAuthUser } from './auth.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithAuthUser>();

    if (req.headers.authorization && req.headers.authorization !== 'null') {
      const token = req.headers.authorization as string;

      const payload = jwt.decode(token) as AuthUser;

      const data = await this.prisma.user.findUnique({
        where: { id: payload.id },
        include: { role: true },
      });

      req.authUser = {
        id: data.id,
        username: data.username,
        role: data.role.name,
        permissions: data.role.modulePermissions,
      };

      return true;
    } else {
      throw new HttpException(
        'No token provided. Please provide token in headers.authorization',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
