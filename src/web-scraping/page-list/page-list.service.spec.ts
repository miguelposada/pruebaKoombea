import { Test, TestingModule } from '@nestjs/testing';
import { PageListService } from './page-list.service';

describe('PageListService', () => {
  let service: PageListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageListService],
    }).compile();

    service = module.get<PageListService>(PageListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
