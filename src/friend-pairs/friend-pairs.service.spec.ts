/* import { Test, TestingModule } from '@nestjs/testing';
import { FriendPairService } from './friend-pairs.service';
import { UserSelectionService } from './user-selection.service';
import { Model } from 'mongoose';
import { FriendPairModel } from './friend-pairs.model';
import { UserModel } from '../auth/user.model';
import { getModelToken } from '@nestjs/mongoose';

describe('FriendPairService', () => {
  let service: FriendPairService;
  let userSelectionService: UserSelectionService;
  let friendPairModel: FriendPairModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FriendPairService,
        UserSelectionService,
        {
          provide: getModelToken('FriendPair'),
          useValue: Model<FriendPairModel>,
        },
        {
          provide: UserSelectionService,
          useValue: {
            selectRandomUser: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<FriendPairService>(FriendPairService);
    userSelectionService = module.get<UserSelectionService>(UserSelectionService);
    friendPairModel = module.get<FriendPairModel>(getModelToken('FriendPair'));

  });

  describe('createFriendPair', () => {

    const user: UserModel = new UserModel();
    user.username = 'randomUser';
    user._id = 'randomUserId';
    user.password = 'password'; // Aquí puedes asignar un valor por defecto o dejarlo en blanco
    
    it('should save the user successfully', async () => {
      const randomUserIdResult: Pick<UserModel, 'username' | '_id'> = {
        username: 'randomUser',
        _id: 'randomUserId',
      };
      const saveStatus = new FriendPairModel({
        user: randomUserIdResult.username,
        loggedUserId: 'loggedUserId',
        friend: randomUserIdResult._id,
      });
      jest.spyOn(friendPairModel, 'save').mockResolvedValue(saveStatus);
      const result = await service.saveUser('loggedUserId', user);
      expect(result).toEqual(randomUserIdResult.username);
    });
    it('should return an error if saving the user fails', async () => {
      const randomUserIdResult: Pick<UserModel, 'username' | '_id'> = {
        username: 'randomUser',
        _id: 'randomUserId',
      };
      const error = new Error('Error saving user');
      jest.spyOn(friendPairModel, 'save').mockRejectedValue(error);
      const result = await service.saveUser('loggedUserId', user);
      expect(result).toEqual(error);
    });
  });
});
 */
import { Test, TestingModule } from '@nestjs/testing';
import { FriendPairService } from './friend-pairs.service';
import { UserSelectionService } from './user-selection.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendPairModel } from './friend-pairs.model';
import { RandomUserIdResult } from './randomUserIdResult.interface';
import { UserModel } from '../auth/user.model';

describe('FriendPairService', () => {
  let service: FriendPairService;
  let userSelectionService: UserSelectionService;
  let friendPairModel: Model<FriendPairModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FriendPairService,
        UserSelectionService,
        {
          provide: getModelToken('FriendPair'),
          useValue: Model,
        },
        {
          provide: UserSelectionService,
          useValue: {
            selectRandomUser: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<FriendPairService>(FriendPairService);
    userSelectionService = module.get<UserSelectionService>(UserSelectionService);
    friendPairModel = module.get<Model<FriendPairModel>>(getModelToken('FriendPair'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createFriendPair', () => {
    it('should create a friend pair and return the username', async () => {
      const loggedUserId = 'loggedUserId';
      
      const randomUserIdResult: RandomUserIdResult = { username: 'randomUser', _id: 'randomUserId' };
      const expectedUsername = randomUserIdResult.username;

      jest.spyOn(userSelectionService, 'selectRandomUser').mockResolvedValue(randomUserIdResult as UserModel);
      jest.spyOn(service, 'saveUser').mockResolvedValue(expectedUsername);

      const result = await service.createFriendPair(loggedUserId);

      expect(result).toEqual(expectedUsername);
      expect(userSelectionService.selectRandomUser).toHaveBeenCalledWith(loggedUserId);
      expect(service.saveUser).toHaveBeenCalled();
    });

    it('should throw an error if selectRandomUser throws an error', async () => {
      const loggedUserId = 'loggedUserId';
      const errorMessage = 'Error selecting random user';

      jest.spyOn(userSelectionService, 'selectRandomUser').mockRejectedValue(new Error(errorMessage));

      await expect(service.createFriendPair(loggedUserId)).rejects.toThrowError(errorMessage);
    });

    it('should throw an error if saving the friend pair fails', async () => {
      const loggedUserId = 'loggedUserId';
      const randomUserIdResult: RandomUserIdResult = { username: 'randomUser', _id: 'randomUserId' };
      const errorMessage = 'Error saving the friend pair';

      jest.spyOn(userSelectionService, 'selectRandomUser').mockResolvedValue(randomUserIdResult as UserModel);
      jest.spyOn(service, 'saveUser').mockRejectedValue(new Error(errorMessage));

      await expect(service.createFriendPair(loggedUserId)).rejects.toThrowError(errorMessage);
    });
  });
});
