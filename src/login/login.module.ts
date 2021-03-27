import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { Account } from '../entity/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
