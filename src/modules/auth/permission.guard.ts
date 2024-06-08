import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ModulePermissions } from '@prisma/client';

import { PERMISSION_KEY } from './permission.decorator';
import { RequestWithAuthUser } from './auth.entity';

// Read documentation here
// https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.getAllAndOverride<
      ModulePermissions[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    // If the controller is public and not required any role to access,
    // then continue to next step
    if (!requiredPermission) {
      return true;
    }

    const { authUser } = context
      .switchToHttp()
      .getRequest<RequestWithAuthUser>();

    if (!authUser) {
      throw new HttpException(
        'Invalid permission. Permission data not found',
        HttpStatus.NOT_FOUND,
      );
    }

    if (authUser.permissions.includes(ModulePermissions.ALL)) {
      return true;
    }

    return requiredPermission.some((permission) =>
      authUser.permissions.includes(permission),
    );
  }
}
