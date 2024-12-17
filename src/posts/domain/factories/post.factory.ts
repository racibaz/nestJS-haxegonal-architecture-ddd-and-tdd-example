import { randomUUID } from 'crypto';
import { Post } from '../post';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostFactory {
  create(title: string, description: string) {
    const postId = randomUUID();
    return new Post(postId, title, description);
  }
}