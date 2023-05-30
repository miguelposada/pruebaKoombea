import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  // Registrar el middleware de autenticación
  app.use(new AuthMiddleware().use);

  await app.listen(3000, () =>{
    console.log("Server running in port 3000")
  });
}
bootstrap();

