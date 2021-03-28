import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { Account } from '../entity/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
