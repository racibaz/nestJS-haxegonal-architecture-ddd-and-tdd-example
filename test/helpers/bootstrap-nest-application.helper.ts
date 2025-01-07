import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { appCreate } from '../../src/app.create';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../src/app.module';

export async function bootstrapNestApplication(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule.register({ driver: 'orm' })],
    providers: [ConfigService],
  }).compile();

  // Instantiate the app
  const app: INestApplication = moduleFixture.createNestApplication();
  appCreate(app);
  await app.init();
  return app;
}
