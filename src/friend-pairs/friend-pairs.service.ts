// friend-pair.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendPair } from './friend-pairs.model';
import { UserSelectionService } from './user-selection.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable()
export class FriendPairService {

  constructor(
    @InjectModel('FriendPair') private readonly friendPairModel: Model<FriendPair>,
    private readonly userSelectionService: UserSelectionService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) { }

  async createFriendPair(loggedUserId: string): Promise<string> {
    try {
      const randomUserId = await this.userSelectionService.selectRandomUser(loggedUserId);
      console.log(randomUserId);
      
      if (randomUserId) {
        return(`Error: ${randomUserId}`)
       // this.errorHandlerService.throwError('Ya tienes asignado un amigo secreto. No puedes jugar nuevamente.');
      }
      const friendPair = new this.friendPairModel({
        user: randomUserId,
        loggedUserId: loggedUserId,
        friend: randomUserId,
      });

      let saveStatus = await friendPair.save();
      return 'Par de amigos creado exitosamente' + saveStatus;
    } catch (error) {
      return error
    }

  }
}
