import { SetMetadata } from '@nestjs/common';

import { ModulePermissions } from './permission.entity';

// Read documentation here
// https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata

export const PERMISSION_KEY = 'permission';
export const Permissions = (permissions: ModulePermissions[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
