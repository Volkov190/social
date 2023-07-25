import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { registerEnumType } from '@nestjs/graphql';
import { Gender } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  registerEnumType(Gender, { name: 'Gender' });
  await app.listen(process.env.PORT);
}
bootstrap();
