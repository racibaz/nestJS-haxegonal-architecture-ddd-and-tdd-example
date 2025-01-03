import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register({ driver: 'orm' }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Hexagonal Architecture + DDD + EDA + TDD + Example')
    .setDescription(
      'Hexagonal Architecture + DDD + EDA + TDD  Example API Description',
    )
    .setVersion('1.0')
    .addTag('Modules')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useLogger(new Logger());
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
