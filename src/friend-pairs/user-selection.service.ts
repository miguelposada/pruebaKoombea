// user-selection.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { UserModel } from '../auth/user.model';
import { FriendPairModel } from './friend-pairs.model';
import { InjectModel } from '@nestjs/mongoose';

const NOT_AVAILABLE_TO_PAIR = true;
const NOT_EXIST = 0;

@Injectable()
export class UserSelectionService {
  private static instance: UserSelectionService;
   constructor(@InjectModel('User') private readonly userModel: Model<UserModel>,
    @InjectModel('FriendPair') private readonly friendPairModel: Model<FriendPairModel>) { }

  static async getInstance(userModel: Model<UserModel>, friendPairModel: Model<FriendPairModel>): Promise<UserSelectionService> {
    if (!UserSelectionService.instance) {
      UserSelectionService.instance = new UserSelectionService(userModel, friendPairModel);
    }
    return UserSelectionService.instance;
  }

  async selectRandomUser(loggedUserId): Promise<UserModel> {
    try {
      const userPaired = await this.hasAssignedSecretFriend(loggedUserId);
      if(userPaired == NOT_AVAILABLE_TO_PAIR){
        throw new NotFoundException(`el usuario ${loggedUserId} ya tiene asignado un amigo secreto `);
      }else{
        const AllUsersAvailable = await this.getListOfAvailables(loggedUserId);
        return this.getEligibleUser(AllUsersAvailable);
      }
    } catch (exception) {
      throw new Error(exception);
    }
  }

  async hasAssignedSecretFriend(loggedUserId: string): Promise<boolean> {
    try {
      const count = await this.friendPairModel.countDocuments({ loggedUserId:  loggedUserId }).exec();
      return count > 0;
    } catch (error) {
      console.log(loggedUserId,error);
      return error
    }
  }

  async getListOfAvailables(userId: string): Promise<UserModel[]> {
    try {
      const availableList = await this.userModel.find({ _id: { $ne: new Types.ObjectId(userId) } }).exec();
      if(availableList.length != NOT_EXIST){
        return availableList;
      }else{
        throw new NotFoundException(`no hay mas usuarios disponibles. encontrados: ${availableList}`);
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Error seleccionando los usuarios disponibles: ${error}`);
    }
  }

  async getEligibleUser(AllUsersAvailable): Promise<UserModel> {
    try {
      if(AllUsersAvailable.length == NOT_EXIST){
        throw new NotFoundException(`No se encontraron usuarios para crear amigo secreto ${AllUsersAvailable}`);
      }
      return this.getFriendRandomly(AllUsersAvailable);
    } catch (error) {
      console.log(error);
      throw new Error(`Error ${error} calculando el usuario random`);
    }
  }

  async getFriendRandomly(AllUsersAvailable){
    try {
      const UsersForRandom = await AllUsersAvailable.map(friendPair => {
        this.hasAssignedSecretFriend(friendPair._id);
        return friendPair;
      });
      const randomIndex = Math.floor(Math.random() * UsersForRandom.length);
      const randomUser = UsersForRandom[randomIndex];
      return randomUser; 
    } catch (error) {
      console.log(error);
      throw new Error(`Error ${error} obteniendo usuario aleatoriamente.`);
    }
    
  }

}
