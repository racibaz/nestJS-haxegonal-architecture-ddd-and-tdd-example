import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostRepository } from '../../../application/ports/post.repository';
import { OrmPostRepository } from './repositories/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [
    {
      provide: PostRepository,
      useClass: OrmPostRepository,
    },
  ],
  exports: [PostRepository],
})
export class OrmPostPersistenceModule {}
