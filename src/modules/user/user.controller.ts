import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionGuard } from '../auth/permission.guard';
import { Permissions } from '../auth/permission.decorator';
import { ModulePermissions } from '../auth/permission.entity';
import {
  GetUsers,
  GetUsersDto,
  ResponseUpsertDto,
  UpsertUserDto,
} from './user.entity';

@ApiTags('user')
@Controller()
@UseGuards(AuthGuard, PermissionGuard)
@Permissions([ModulePermissions.USER_MODULE])
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user')
  @ApiOkResponse({ type: GetUsersDto })
  async list() {
    return GetUsers.parse(await this.userService.list());
  }

  @Post('/user')
  @ApiOkResponse({ type: ResponseUpsertDto })
  async detail(@Body() body: UpsertUserDto) {
    const { username, password, roleId } = body;
    return this.userService.create(username, password, roleId);
  }
}
