import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const userName = user.username;
    const token = await this.authService.generateToken(user); // Generar el token JWT
    return {
      token, // Devolver el token en la respuesta
      userName, // Opcional: Puedes devolver los datos del usuario si lo deseas
    };
  } */

  /* async login(@Body() body: any) {
    // Implementa la lógica de inicio de sesión utilizando el servicio de autenticación
    const { username, password } = body;
    return this.authService.login(username, password);
  } */

  /* @Post('register')
  async register(@Body() body: any) {
    // Implementa la lógica de registro utilizando el servicio de autenticación
    const { username, password } = body;
    return this.authService.register(username, password);
  } */

  @Get('getTask')
  async getTask(@Body() body: any) {
    const { id } = body;
    return this.authService.getTask(id);
  }
}
