import 'dotenv/config';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/application/posts.module';
import { CoreModule } from './modules/core/core.module';
import { ApplicationBootstrapOptions } from './modules/posts/common/interface/application-bootstap-options';
import { PostsInfrastructureModule } from './modules/posts/infrastructure/posts-infrastructure.module';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './modules/users/application/users.service';
import { UsersModule } from './modules/users/application/users.module';
import { AuthModule } from './modules/auth/application/auth.module';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './modules/auth/application/guards/access-token/access-token.guard';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './modules/auth/config/jwt.config';
import { AuthenticationGuard } from './modules/auth/application/guards/authentication/authentication.guard';

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
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
  ],
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
