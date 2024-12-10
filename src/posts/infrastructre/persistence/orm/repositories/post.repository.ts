import { PostRepository } from '../../../../application/ports/post.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../../domain/post';
import { PostMapper } from '../mappers/post.mapper';

@Injectable()
export class OrmPostRepository implements PostRepository {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async findAll(): Promise<Post[]> {
    const entities = await this.postRepository.find();
    return entities.map((item) => PostMapper.toDomain(item));
  }

  async save(post: Post): Promise<Post> {
    const persistenceModel = PostMapper.toPersistence(post);
    const newEntity = await this.postRepository.save(persistenceModel);
    return PostMapper.toDomain(newEntity);
  }
}
