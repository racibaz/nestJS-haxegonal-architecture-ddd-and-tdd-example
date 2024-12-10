import { Module } from '@nestjs/common';
import { PostRepository } from '../../../application/ports/post.repository';
import { InMemoryPostRepository } from './repositories/post.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: PostRepository,
      useClass: InMemoryPostRepository,
    },
  ],
  exports: [PostRepository],
})
export class InMemoryPostPersistenceModule {}
