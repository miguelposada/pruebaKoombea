import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/washpostnotes'),
    AuthModule,
    ErrorHandlerModule,
    NotesModule,
  ],
})
export class AppModule {}
