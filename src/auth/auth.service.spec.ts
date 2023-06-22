import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { UserModel } from './user.model';
import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<UserModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken('User'),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<UserModel>>(getModelToken('User'));
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
      const mockUser: Partial<UserModel> = {
        username: 'username',
        password: 'hashedPassword',
      };
      (userModel.findOne as jest.Mock).mockReturnValueOnce(
        (mockUser as unknown) as Query<unknown, unknown, {}, UserModel, 'findOne'>,
      );
      jest.spyOn(authService, 'validatePassword').mockResolvedValueOnce(
        (mockUser as unknown) as UserModel,
      );

      const result = await authService.validateCredentials(
        'username',
        'password',
      );

      expect(userModel.findOne).toBeCalledWith({ username: 'username' });
      expect(authService.validatePassword).toBeCalledWith('password', mockUser);
      expect(result).toEqual(mockUser as UserModel);
    });
  });

  // Continúa con más pruebas unitarias para otros métodos del servicio AuthService
  describe('register', () => {
    it('should register a new user and return success message', async () => {
      const username = 'newuser';
      const password = 'password123';
      const hashedPassword = 'hashedPassword';
      
      const saveMock = jest.fn().mockResolvedValueOnce(undefined);
      const userModelMock = { save: saveMock };
  
      jest.spyOn(userModel, 'findOne').mockReturnThis();
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hashedPassword);
  
      const result = await authService.register(username, password);
  
      expect(userModelMock.save).toBeCalled();
      expect(result).toEqual({ success: true, message: 'Registro exitoso' });
    });
  });  

  describe('validateUserName', () => {
    it('should return success when username is not assigned', async () => {
      (userModel.findOne as jest.Mock).mockReturnValueOnce(null);

      const result = await authService.validateUserName('newUsername');

      expect(result).toEqual({ success: true, message: 'username available to save' });
    });

    it('should return failure when username is already assigned', async () => {
      const existingUser: Partial<UserModel> = {
        username: 'existingUsername',
      };
      (userModel.findOne as jest.Mock).mockReturnValueOnce(
        (existingUser as unknown) as Query<unknown, unknown, {}, UserModel, 'findOne'>,
      );

      const result = await authService.validateUserName('existingUsername');

      expect(result).toEqual({ success: false, message: 'username is already assigned' });
    });
  });

  describe('login', () => {
    it('should generate a token for the user', async () => {
      const username = 'username';
      const generateTokenSpy = jest.spyOn(authService, 'generateToken').mockReturnValueOnce(Promise.resolve('token'));
  
      const result = await authService.login(username);
  
      expect(generateTokenSpy).toBeCalledWith(username);
      expect(result).toBe('token');
    });
  });
  
  describe('generateToken', () => {
    it('should generate a token with the given username', async () => {
      const username = 'username';
      const expectedToken = 'generatedToken';
  
      const signSpy = jest.spyOn(jwt, 'sign').mockReturnValueOnce(expectedToken);
  
      const result = await authService.generateToken(username);
  
      expect(signSpy).toBeCalledWith({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
      expect(result).toBe(expectedToken);
    });
  });

});
