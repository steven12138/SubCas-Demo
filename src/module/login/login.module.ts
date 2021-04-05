import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { Account } from '../../entity/account.entity';
import { JwtModule } from '@nestjs/jwt';
import { EnvConst } from '../../env/env';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      secret: EnvConst.JwtSecret,
      signOptions: {
        expiresIn: '15s',
      },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
