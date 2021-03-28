import { Module } from '@nestjs/common';

// About App Service
import { AppController } from './app.controller';
import { AppService } from './app.service';

//SQL Module
import { TypeOrmModule } from '@nestjs/typeorm';

// API Module
import { LoginModule } from './login/login.module';
import { ValidateModule } from './validate/validate.module';
import { LogoutModule } from './logout/logout.module';
import { SignupModule } from './signup/signup.module';

//EnvConst && Entity
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
    LoginModule,
    ValidateModule,
    LogoutModule,
    SignupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
