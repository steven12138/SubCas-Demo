import { Test, TestingModule } from '@nestjs/testing';
import { ModifyPasswordService } from './modify-password.service';

describe('ModifyPasswordService', () => {
  let service: ModifyPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModifyPasswordService],
    }).compile();

    service = module.get<ModifyPasswordService>(ModifyPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
