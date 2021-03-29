import { Test, TestingModule } from '@nestjs/testing';
import { MailVerifyController } from './mail-verify.controller';

describe('MailVerifyController', () => {
  let controller: MailVerifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailVerifyController],
    }).compile();

    controller = module.get<MailVerifyController>(MailVerifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
