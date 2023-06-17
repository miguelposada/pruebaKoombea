// user-selection.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { User } from '../auth/user.model';
import { FriendPair } from './friend-pairs.model';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundError, throwIfEmpty } from 'rxjs';

const AVAILABLE_TO_PAIR = false;
const NOT_AVAILABLE_TO_PAIR = true;
const NOT_EXIST = 0;

@Injectable()
export class UserSelectionService {
  private static instance: UserSelectionService;
  constructor(@InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('FriendPair') private readonly friendPairModel: Model<FriendPair>) { }

  static async getInstance(userModel: Model<User>, friendPairModel: Model<FriendPair>): Promise<UserSelectionService> {
    if (!UserSelectionService.instance) {
      UserSelectionService.instance = new UserSelectionService(userModel, friendPairModel);
    }
    return UserSelectionService.instance;
  }

  async selectRandomUser(loggedUserId): Promise<String> {
    try {
      const userPaired = await this.hasAssignedSecretFriend(loggedUserId);
      if(userPaired){
        const AllUsersAvailable = await this.getListOfAvailables(loggedUserId);
        return this.getEligibleUser(AllUsersAvailable);
      }else{
        return "Error. el ususairo ya tiene asignado un amigo secreto"
      }
    } catch (exception) {
      return exception;
    }
  }

  async hasAssignedSecretFriend(userId: string): Promise<boolean> {
    const count = await this.friendPairModel.countDocuments({ user: userId }).exec();
    return count > 0;
  }

  async getListOfAvailables(userId: string): Promise<User[]> {
    try {
      return await this.userModel.find({ _id: { $ne: new Types.ObjectId(userId) } }).exec();
    } catch (error) {
      throw new Error(`Error seleccionando los usuarios disponibles: ${error}`);
    }
  }

  async getEligibleUser(AllUsersAvailable): Promise<string> {
    try {
      console.log("Calculando el random user...");
      
      const UsersForRandom = await AllUsersAvailable.map(friendPair => {
        this.hasAssignedSecretFriend(friendPair._id);
        return friendPair;
      });
      const randomIndex = Math.floor(Math.random() * UsersForRandom.length);
      const randomUser = UsersForRandom[randomIndex];
      return randomUser._id;
    } catch (error) {
      throw new Error(`Error ${error} calculando el usuario aleatoriamente`)
    }
  }
}
