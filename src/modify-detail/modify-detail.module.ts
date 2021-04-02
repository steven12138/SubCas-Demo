import { Module } from '@nestjs/common';
import { ModifyDetailController } from './modify-detail.controller';
import { ModifyDetailService } from './modify-detail.service';

@Module({
  imports: [],
  controllers: [ModifyDetailController],
  providers: [ModifyDetailService],
})
export class ModifyDetailModule {}
