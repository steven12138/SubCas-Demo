import { Test, TestingModule } from '@nestjs/testing';
import { ModifyPasswordController } from './modify-password.controller';

describe('ModifyPasswordController', () => {
  let controller: ModifyPasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModifyPasswordController],
    }).compile();

    controller = module.get<ModifyPasswordController>(ModifyPasswordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
