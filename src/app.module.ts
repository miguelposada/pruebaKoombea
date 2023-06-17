import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { FriendPairModule } from './friend-pairs/friend-pairs.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/encuentro'),
    AuthModule,
    FriendPairModule,
    ErrorHandlerModule,
  ],
})
export class AppModule {}
