import { Module } from '@nestjs/common';
import { ModifyPasswordController } from './modify-password.controller';
import { ModifyPasswordService } from './modify-password.service';

@Module({
  imports: [],
  controllers: [ModifyPasswordController],
  providers: [ModifyPasswordService],
})
export class ModifyPasswordModule {}
