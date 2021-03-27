import { NestFactory } from '@nestjs/core';
import fastifyCookie from 'fastify-cookie';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { EnvConst } from './env/env';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.register(fastifyCookie, {
    secret: EnvConst.CookieSecert,
  });

  await app.listen(port);
}

bootstrap();
