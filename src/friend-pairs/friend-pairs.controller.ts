// friend-pairs.controller.ts
import { Controller, Post, Body, Request, HttpStatus, HttpException } from '@nestjs/common';
import { FriendPairService } from './friend-pairs.service';
import { LoggedUserIdDto } from './dto/loggedUserId.dto';

@Controller('friend-pairs')
export class FriendPairsController {
  constructor(private readonly friendPairsService: FriendPairService
    ) { }

  @Post('find')
  async createFriendPair(@Body() loggedUserIdDto: LoggedUserIdDto) {
    const loggedUserId = loggedUserIdDto.loggedUserId; // Obtener el user_id del usuario logueado desde el objeto Request

    try {
      const UserAssignResult = await this.friendPairsService.createFriendPair(loggedUserId);
      if (UserAssignResult instanceof Error) {
        throw UserAssignResult;
      } else {
        return {
          success: true,
          message: `amigo secreto creado para el usuario ${loggedUserId}`,
          data: UserAssignResult,
        };
      }
    } catch (error) {
      const errorMessage = 'Error creating friend pair';
      return {
        success: false,
        message: errorMessage,
        data: null,
      };
    }
  }
}
