import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateCredentials(
        loginDto.username,
        loginDto.password,
      );
      const token = await this.authService.login(user.username);
      return {
        token,
      };
    } catch (excep) {
      return excep;
    }
  }

  @Post('register')
  async register(@Body() body: any) {
    const { username, password } = body;
    const saveState = await this.authService.validateUserName(username);
    return saveState.success
      ? this.authService.register(username, password)
      : saveState;
  }
}
