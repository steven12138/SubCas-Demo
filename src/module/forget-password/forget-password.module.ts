import { Module } from '@nestjs/common';
import { ForgetPasswordController } from './forget-password.controller';
import { ForgetPasswordService } from './forget-password.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../entity/account.entity';
import { EnvConst } from '../../env/env';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      secret: EnvConst.JwtSecret,
      signOptions: {
        expiresIn: '12h',
        algorithm: 'HS512',
      },
    }),
  ],
  controllers: [ForgetPasswordController],
  providers: [ForgetPasswordService],
})
export class ForgetPasswordModule {}
