import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { z } from 'zod';
import { Request } from 'express';

import { ModulePermissions } from './permission.entity';

export interface AuthUser {
  id: string;
  username: string;
  role: string;
  permissions: ModulePermissions[];
}

export interface RequestWithAuthUser extends Request {
  authUser?: AuthUser;
}

export const LoginResponse = z
  .object({
    token: z.string(),
  })
  .openapi('LoginResponse');
export class LoginResponseDto extends createZodDto(LoginResponse) {}
