import { Test, TestingModule } from '@nestjs/testing';
import { ModifyDetailController } from './modify-detail.controller';

describe('ModifyDetailController', () => {
  let controller: ModifyDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModifyDetailController],
    }).compile();

    controller = module.get<ModifyDetailController>(ModifyDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
