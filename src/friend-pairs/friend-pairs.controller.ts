// friend-pairs.controller.ts
import { Controller, Post, Body, Request, HttpStatus, HttpException } from '@nestjs/common';
import { FriendPairService } from './friend-pairs.service';
import { LoggedUserIdDto } from './dto/loggedUserId.dto';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';

@Controller('friend-pairs')
export class FriendPairsController {
  constructor(private readonly friendPairsService: FriendPairService,
              private readonly errorHandlerService: ErrorHandlerService) {}

  @Post('find')
  async createFriendPair(@Body() loggedUserIdDto: LoggedUserIdDto) {
    const loggedUserId = loggedUserIdDto.loggedUserId; // Obtener el user_id del usuario logueado desde el objeto Request
    
    try {
      // Lógica para crear la amistad utilizando el servicio FriendPairsService
      const result = await this.friendPairsService.createFriendPair(loggedUserId);
      console.log("result:",result);
      
      if(result){
       return this.errorHandlerService.throwError(`No se pudo calcular: ${result}`);
      }
      return {
        success: true,
        message: `amigo secreto creado para el usuario ${loggedUserId}`,
        data: result,
      };
    } catch (error) {
      
      //const statusCode = error?.response?.status || 500;
      const errorMessage = error?.response?.message || 'No se pudo guardar el amigo secreto';
      return error;
      //throw new HttpException(errorMessage, statusCode);
    }
  }
}
