import { Module } from '@nestjs/common';

// About App Service
import { AppController } from './app.controller';
import { AppService } from './app.service';

// SQL 模块
import { TypeOrmModule } from '@nestjs/typeorm';

//Mail
import { MailerModule } from '@nestjs-modules/mailer';

// API 模块
import { LoginModule } from './login/login.module';
import { ValidateModule } from './validate/validate.module';
import { LogoutModule } from './logout/logout.module';
import { SignupModule } from './signup/signup.module';
import { MailVerifyModule } from './mail-verify/mail-verify.module';
import { ModifyDetailModule } from './modify-detail/modify-detail.module';
import { ModifyPasswordModule } from './modify-password/modify-password.module';

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
      entities: [Account],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
