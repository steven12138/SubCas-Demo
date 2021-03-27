import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { LogoutController } from './logout/logout.controller';
import { ValidateController } from './validate/validate.controller';
import { LoginService } from './login/login.service';
import { LogoutService } from './logout/logout.service';
import { ValidateService } from './validate/validate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConst } from './env/env';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: EnvConst.SQLHost,
      port: EnvConst.SQLPort,
      username: EnvConst.SQLUsername,
      password: EnvConst.SQLPassword,
      database: EnvConst.SQLDatabase,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [
    AppController,
    LoginController,
    LogoutController,
    ValidateController,
  ],
  providers: [AppService, LoginService, LogoutService, ValidateService],
})
export class AppModule {
}
