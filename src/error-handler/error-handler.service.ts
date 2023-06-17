import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  throwError(message: string): never {
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }
}
