import { Module } from '@nestjs/common';
import { ErrorHandlerController } from './error-handler.controller';
import { ErrorHandlerService } from './error-handler.service';

@Module({
  controllers: [ErrorHandlerController],
  providers: [ErrorHandlerService]
})
export class ErrorHandlerModule {}
