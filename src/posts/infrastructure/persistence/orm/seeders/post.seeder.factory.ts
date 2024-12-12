import { setSeederFactory } from 'typeorm-extension';
import { PostEntity } from '../entities/post.entity';

export const PostSeederFactory = setSeederFactory(PostEntity, (faker) => {
  const postEntity = new PostEntity();
  postEntity.id = faker.string.uuid().toString();
  postEntity.title = faker.word.words(5);
  postEntity.description = faker.string.sample(15);

  return postEntity;
});
