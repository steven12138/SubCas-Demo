import { Controller, Get } from '@nestjs/common';
import { ModifyDetailService } from './modify-detail.service';

@Controller('modifyDetail')
export class ModifyDetailController {
  constructor(private readonly modifyDetailService: ModifyDetailService) {}

  @Get()
  mailSenderTest(): void {
    this.modifyDetailService.test();
  };

}
