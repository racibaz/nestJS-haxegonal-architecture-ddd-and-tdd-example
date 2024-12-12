import { Post } from '../../domain/post';

export abstract class PostRepository {
  abstract findAll(): Promise<Post[]>;
  abstract save(post: Post): Promise<Post>;
}
