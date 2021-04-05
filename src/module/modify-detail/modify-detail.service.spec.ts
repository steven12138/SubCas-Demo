import { Test, TestingModule } from '@nestjs/testing';
import { ModifyDetailService } from './modify-detail.service';

describe('ModifyDetailService', () => {
  let service: ModifyDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModifyDetailService],
    }).compile();

    service = module.get<ModifyDetailService>(ModifyDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
