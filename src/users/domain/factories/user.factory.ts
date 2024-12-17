import { randomUUID } from 'crypto';
import { User } from '../user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFactory {
  create(name: string, email: string, password: string): User {
    const userId = randomUUID();
    return new User(userId, name, email, password);
  }
}
