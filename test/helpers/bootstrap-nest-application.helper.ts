import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { appCreate } from '../../src/app.create';
import { TypeOrmModule } from '@nestjs/typeorm';

export async function bootstrapNestApplication(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          synchronize: configService.get('database.synchronize'),
          port: configService.get('database.port'),
          username: configService.get('database.user'),
          password: configService.get('database.password'),
          host: configService.get('database.host'),
          autoLoadEntities: configService.get('database.autoLoadEntities'),
          database: configService.get('database.name'),
        }),
      }),
    ],
    providers: [ConfigService],
  }).compile();

  // Instantiate the app
  const app: INestApplication = moduleFixture.createNestApplication();

  //const app = await NestFactory.create(AppModule.register({ driver: 'orm' }));
  appCreate(app);
  await app.init();
  return app;
}
