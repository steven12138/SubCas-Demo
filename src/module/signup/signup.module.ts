import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../entity/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
