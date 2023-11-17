import { NestFactory } from '@nestjs/core';
import { registerEnumType } from '@nestjs/graphql';
import { Gender } from '@prisma/client';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { logger } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.use(logger);
  app.use(cookieParser());
  app.enableCors({ origin: process.env.FRONTEND_URL, credentials: true });

  registerEnumType(Gender, { name: 'Gender' });
  await app.listen(process.env.PORT);
}
bootstrap();
