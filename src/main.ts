import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import * as dotenv from 'dotenv';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  dotenv.config();

  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(new AuthMiddleware().use);

  await app.listen(3000, () => {
    console.log('Server running in port 3000');
  });
}
bootstrap();
