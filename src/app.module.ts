import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/application/posts.module';
import { CoreModule } from './core/core.module';
import { ApplicationBootstrapOptions } from './posts/common/interface/application-bootstap-options';
import { PostsInfrastructureModule } from './posts/infrastructre/posts-infrastructure.module';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService],
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
