import { Module } from '@nestjs/common';

// About App Service
import { AppController } from './app.controller';
import { AppService } from './app.service';

// SQL 模块
import { TypeOrmModule } from '@nestjs/typeorm';

//Mail
import { MailerModule } from '@nestjs-modules/mailer';

// API 模块
import { LoginModule } from './module/login/login.module';
import { ValidateModule } from './module/validate/validate.module';
import { LogoutModule } from './module/logout/logout.module';
import { SignupModule } from './module/signup/signup.module';
import { MailVerifyModule } from './module/mail-verify/mail-verify.module';
import { ModifyDetailModule } from './module/modify-detail/modify-detail.module';
import { ModifyPasswordModule } from './module/modify-password/modify-password.module';
import { ForgetPasswordModule } from './module/forget-password/forget-password.module';
import { RegisteredSystem } from './entity/registeredSystem.entity';

// 数据库设置 env 和 数据表设计 Account
import { EnvConst } from './env/env';
import { Account } from './entity/account.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: EnvConst.SQLHost,
      port: EnvConst.SQLPort,
      username: EnvConst.SQLUsername,
      password: EnvConst.SQLPassword,
      database: EnvConst.SQLDatabase,
      entities: [Account, RegisteredSystem],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: EnvConst.mailHost,
        port: EnvConst.mailPort,
        auth: {
          user: EnvConst.mailAuthUser,
          pass: EnvConst.mailAuthPass,
        },
      },
    }),
    LoginModule,
    ValidateModule,
    LogoutModule,
    SignupModule,
    MailVerifyModule,
    ModifyDetailModule,
    ModifyPasswordModule,
    ForgetPasswordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
