import { Module } from '@nestjs/common';
import { ModifyDetailController } from './modify-detail.controller';

@Module({
  imports: [],
  controllers: [ModifyDetailController],
  providers: [ModifyDetailController],
})
export class ModifyDetailModule {}
