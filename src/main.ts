import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.register({ driver: 'orm' }),
  );
  app.useLogger(new Logger());
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
