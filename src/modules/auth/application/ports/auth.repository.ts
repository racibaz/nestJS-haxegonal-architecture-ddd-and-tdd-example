import { User } from '../../../users/domain/user';
import { UserEntity } from '../../../users/infrastructure/persistence/orm/entities/user.entity';

export abstract class AuthRepository {
  abstract isUserExist(email: string): Promise<boolean>;
  abstract findOneByEmail(email: string): Promise<UserEntity | null>;
  abstract save(user: User): Promise<User>;
}
