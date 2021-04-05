import { Module } from '@nestjs/common';
import { ValidateController } from './validate.controller';
import { ValidateService } from './validate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Account } from '../../entity/account.entity';
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
  controllers: [ValidateController],
  providers: [ValidateService],
})
export class ValidateModule {}
