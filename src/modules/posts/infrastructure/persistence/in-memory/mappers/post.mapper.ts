import { PostEntity } from '../entities/post.entity';
import { Post } from '../../../../domain/post';

export class PostMapper {
  static toDomain(postEntity: PostEntity): Post {
    return new Post(postEntity.id, postEntity.title, postEntity.description);
  }

  static toPersistence(post: Post): PostEntity {
    const entity = new PostEntity();
    entity.id = post.id;
    entity.title = post.title;
    entity.description = post.description;
    return entity;
  }
}
