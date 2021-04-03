import { Module } from '@nestjs/common';
import { ForgetPasswordController } from './forget-password.controller';
import { ForgetPasswordService } from './forget-password.service';

@Module({
  imports: [],
  controllers: [ForgetPasswordController],
  providers: [ForgetPasswordService],
})
export class ForgetPasswordModule {}
