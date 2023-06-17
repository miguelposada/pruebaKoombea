import { Test, TestingModule } from '@nestjs/testing';
import { FriendPairService } from './friend-pairs.service';

describe('FriendPairService', () => {
  let service: FriendPairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendPairService],
    }).compile();

    service = module.get<FriendPairService>(FriendPairService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
