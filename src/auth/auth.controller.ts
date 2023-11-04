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
      const userId = user._id;
      const token = await this.authService.login(user.username);
      return {
        token,
        userId,
      };
    } catch (excep) {
      return excep;
    }
  }

  @Post('register')
  async register(@Body() body: LoginDto) {
    const { username, password } = body;
    const saveState = await this.authService.validateUserName(username);
    if (saveState.success) {
      const respRegisterService = await this.authService.register(
        username,
        password,
      );
      return respRegisterService;
    } else {
      return saveState;
    }
  }
}
