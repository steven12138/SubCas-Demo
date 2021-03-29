import { Module } from '@nestjs/common';
import { MailVerifyController } from './mail-verify.controller';
import { MailVerifyService } from './mail-verify.service';

@Module({
  imports: [],
  controllers: [MailVerifyController],
  providers: [MailVerifyService],
})
export class MailVerifyModule {}
