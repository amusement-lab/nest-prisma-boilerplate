import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async loginUser(@Body() data: { password: string; username: string }) {
    return this.authService.login(data.password, data.username);
  }
}
