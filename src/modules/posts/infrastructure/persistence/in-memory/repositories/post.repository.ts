import { PostRepository } from '../../../../application/ports/post.repository';
import { Injectable } from '@nestjs/common';
import { PostEntity } from '../entities/post.entity';
import { Post } from '../../../../domain/post';
import { PostMapper } from '../mappers/post.mapper';

@Injectable()
export class InMemoryPostRepository implements PostRepository {
  private readonly posts = new Map<string, PostEntity>();

  async findAll(): Promise<Post[]> {
    const entities = Array.from(this.posts.values());
    return entities.map((item) => PostMapper.toDomain(item));
  }

  async save(post: Post): Promise<Post> {
    const persistenceModel = PostMapper.toPersistence(post);
    this.posts.set(persistenceModel.id, persistenceModel);
    return PostMapper.toDomain(persistenceModel);
  }
}
