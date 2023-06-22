// friend-pair.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendPairModel } from './friend-pairs.model';
import { UserSelectionService } from './user-selection.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable()
export class FriendPairService {

  constructor(
    @InjectModel('FriendPair') private readonly friendPairModel: Model<FriendPairModel>,
    private readonly userSelectionService: UserSelectionService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) { }

  async createFriendPair(loggedUserId: string): Promise<String> {
    try {
      const randomUserIdResult = await this.userSelectionService.selectRandomUser(loggedUserId);
      
      if (randomUserIdResult instanceof Error) {
        return this.errorHandlerService.throwError(` ${randomUserIdResult}`);
      }else{
        const friendPair = new this.friendPairModel({
          user: randomUserIdResult.username,
          loggedUserId: loggedUserId,
          friend: randomUserIdResult._id,
        });
  
        const saveStatus = await friendPair.save();
        if(saveStatus && saveStatus instanceof this.friendPairModel){
          return randomUserIdResult.username;
        }
      }
    } catch (error) {
      return error
    }

  }
}
