import { DynamicModule, Module, Type } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from '../presenters/http/posts.controller';
import { PostFactory } from '../domain/factories/post.factory';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostFactory],
})
export class PostsModule {
  static withInfrastucture(infrastructureModule: Type | DynamicModule) {
    return {
      module: PostsModule,
      imports: [infrastructureModule],
    };
  }
}
