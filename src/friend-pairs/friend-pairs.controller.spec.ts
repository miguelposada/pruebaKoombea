import { Test, TestingModule } from '@nestjs/testing';
import { FriendPairsController } from './friend-pairs.controller';
import { FriendPairService } from './friend-pairs.service';
import { UserSelectionService } from './user-selection.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

import { getModelToken } from '@nestjs/mongoose';

describe('FriendPairsController', () => {
  let controller: FriendPairsController;
  let service: FriendPairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendPairsController],
      providers: [
        FriendPairService,
        UserSelectionService,
        ErrorHandlerService,
        // Otros servicios y dependencias necesarios
        {
          provide: getModelToken('FriendPair'),
          useValue: {}, // Mock o valor de prueba para FriendPairModel
        },
        {
          provide: getModelToken('User'),
          useValue: {}, // Puedes proporcionar un objeto de prueba o un mock del UserModel
        },
      ],
    }).compile();

    controller = module.get<FriendPairsController>(FriendPairsController);
    service = module.get<FriendPairService>(FriendPairService);
  });

  describe('createFriendPair', () => {
    it('should create a friend pair and return success response', async () => {
      const loggedUserIdDto = { loggedUserId: '123456' };
      const expectedResponse = {
        success: true,
        message: `amigo secreto creado para el usuario ${loggedUserIdDto.loggedUserId}`,
        data: 'userAssignResult', // Coloca aquí el resultado esperado
      };

      jest.spyOn(service, 'createFriendPair').mockResolvedValue('userAssignResult');

      const result = await controller.createFriendPair(loggedUserIdDto);

      expect(result).toEqual(expectedResponse);
    });

    it('should handle errors and return error response', async () => {
      const loggedUserIdDto = { loggedUserId: '123456' };
      const errorMessage = 'Error creating friend pair';

      jest.spyOn(service, 'createFriendPair').mockRejectedValue(new Error(errorMessage));

      const result = await controller.createFriendPair(loggedUserIdDto);

      expect(result).toEqual({
        success: false,
        message: errorMessage,
        data: null,
      });
    });
  });
});

