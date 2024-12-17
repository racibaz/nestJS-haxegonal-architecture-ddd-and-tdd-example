import { UserEntity } from '../entities/user.entity';
import { User } from '../../../../domain/user';

export class UserMapper {
  static toDomain(userEntity: UserEntity): User {
    return new User(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.password,
    );
  }

  static toPersistence(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.name = user.name;
    entity.password = user.password;
    return entity;
  }
}
