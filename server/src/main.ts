import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import sessionMiddleware from './sessionMiddleware';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ["http://127.0.0.1:4200"], credentials: true
  });

  app.setGlobalPrefix("api");
  app.use(sessionMiddleware);
  app.use(cookieParser());

  process
    .on('unhandledRejection', (reason, p) => { })
    .on('uncaughtException', err => { });

  await app.listen(3000);
}
bootstrap();
