import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import secureSession from 'fastify-secure-session';
import { EnvConst } from './env/env';

// 挂载端口
const port = 3000;

// 引导程序
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.register(secureSession, {
    secret: EnvConst.SessionSecret,
    salt: EnvConst.SessionSalt,
  });

  await app.listen(port);
}

bootstrap();
