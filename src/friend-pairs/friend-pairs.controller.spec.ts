import { Test, TestingModule } from '@nestjs/testing';
import { FriendPairController } from './friend-pairs.controller';

describe('FriendPairController', () => {
  let controller: FriendPairController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendPairController],
    }).compile();

    controller = module.get<FriendPairController>(FriendPairController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
