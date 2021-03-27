import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { account } from '../entity/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([account])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
