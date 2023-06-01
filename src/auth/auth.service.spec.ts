import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { User } from './user.model';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken('User'),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken('User'));
  });

  // Aquí puedes escribir tus pruebas unitarias

  describe('validateCredentials', () => {
    it('should throw UnauthorizedException if user does not exist', async () => {
      (userModel.findOne as jest.Mock).mockReturnValueOnce(null);

      await expect(
        authService.validateCredentials('username', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should call validatePassword and return user if user exists', async () => {
      const mockUser: Partial<User> = {
        username: 'username',
        password: 'hashedPassword',
      };
      (userModel.findOne as jest.Mock).mockReturnValueOnce(
        (mockUser as unknown) as Query<unknown, unknown, {}, User, 'findOne'>,
      );
      jest.spyOn(authService, 'validatePassword').mockResolvedValueOnce(
        (mockUser as unknown) as User,
      );

      const result = await authService.validateCredentials(
        'username',
        'password',
      );

      expect(userModel.findOne).toBeCalledWith({ username: 'username' });
      expect(authService.validatePassword).toBeCalledWith('password', mockUser);
      expect(result).toEqual(mockUser as User);
    });
  });

  // Continúa con más pruebas unitarias para otros métodos del servicio AuthService

});
