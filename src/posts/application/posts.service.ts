import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from '../presenters/http/dto/update-post.dto';
import { CreatePostCommand } from './commands/create-post.command';
import { PostRepository } from './ports/post.repository';
import { PostFactory } from '../domain/factories/post.factory';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postFactory: PostFactory,
  ) {}

  create(createPostCommand: CreatePostCommand) {
    const post = this.postFactory.create(
      createPostCommand.title,
      createPostCommand.description,
    );

    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
