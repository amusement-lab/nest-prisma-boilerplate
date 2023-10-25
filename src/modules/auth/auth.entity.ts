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
