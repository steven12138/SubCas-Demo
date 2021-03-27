import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogoutController } from './logout/logout.controller';
import { ValidateController } from './validate/validate.controller';
import { LogoutService } from './logout/logout.service';
import { ValidateService } from './validate/validate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './login/login.module';
import { EnvConst } from './env/env';
import {account} from './entity/account.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: EnvConst.SQLHost,
      port: EnvConst.SQLPort,
      username: EnvConst.SQLUsername,
      password: EnvConst.SQLPassword,
      database: EnvConst.SQLDatabase,
      entities: [account],
      synchronize: true,
    }),
    LoginModule,
  ],
  controllers: [AppController, LogoutController, ValidateController],
  providers: [AppService, LogoutService, ValidateService],
})
export class AppModule {}
