import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
/**
 todo it did not use but stay for learners.
 Why did not we use this service in application side?
 */
@Injectable()
export class HasherService {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
