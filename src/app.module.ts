import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/encuentro'),
    AuthModule,
    ErrorHandlerModule,
  ],
})
export class AppModule {}
