import 'dotenv/config';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/application/posts.module';
import { CoreModule } from './core/core.module';
import { ApplicationBootstrapOptions } from './posts/common/interface/application-bootstap-options';
import { PostsInfrastructureModule } from './posts/infrastructure/posts-infrastructure.module';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/application/users.service';
import { UsersModule } from './users/application/users.module';
import { AuthModule } from './auth/application/auth.module';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';

// Get the current NODE_ENV
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: ['.env.development', '.env'],
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        PostsModule.withInfrastucture(
          PostsInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
