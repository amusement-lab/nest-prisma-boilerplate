import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async loginUser(@Body() data: { password: string; username: string }) {
    return this.authService.login(data.password, data.username);
  }
}
