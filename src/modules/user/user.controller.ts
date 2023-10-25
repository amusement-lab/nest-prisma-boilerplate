import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionGuard } from '../auth/permission.guard';
import { Permissions } from '../auth/permission.decorator';
import { ModulePermissions } from '../auth/permission.entity';

@Controller()
@UseGuards(AuthGuard, PermissionGuard)
@Permissions([ModulePermissions.USER_MODULE])
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user')
  async list() {
    return this.userService.list();
  }

  @Post('/user')
  async detail(@Body() body: any) {
    const { username, password, roleId } = body;
    return this.userService.create(username, password, roleId);
  }
}
