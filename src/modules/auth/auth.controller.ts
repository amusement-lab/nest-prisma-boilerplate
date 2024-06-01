import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponse, LoginResponseDto } from './auth.entity';
import { LoginUserDto } from '../user/user.entity';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOkResponse({ type: LoginResponseDto })
  @HttpCode(200)
  async loginUser(@Body() data: LoginUserDto) {
    return LoginResponse.parse(
      await this.authService.login(data.password, data.username),
    );
  }
}
