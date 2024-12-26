import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstap-options';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === 'orm'
        ? [
            TypeOrmModule.forRootAsync({
              imports: [ConfigModule],
              inject: [ConfigService],
              useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                //entities: [User],
                synchronize: configService.get('database.synchronize'),
                port: configService.get('database.port'),
                username: configService.get('database.user'),
                password: configService.get('database.password'),
                host: configService.get('database.host'),
                autoLoadEntities: configService.get(
                  'database.autoLoadEntities',
                ),
                database: configService.get('database.name'),
              }),
            }),
          ]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
