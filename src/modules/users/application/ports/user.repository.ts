import { User } from '../../domain/user';
import { UpdateUserRequestDto } from '../../presenters/http/dto/update-user.request-dto';
import { GenericFilterDto } from '../../../core/application/ports/generic-filter.dto';

export abstract class UserRepository {
  abstract findAll(filter: GenericFilterDto): Promise<User[]>;
  abstract findBy(id: string): Promise<User | null>;
  abstract save(user: User): Promise<User>;
  abstract update(
    id: string,
    updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<User>;
  abstract delete(id: string): Promise<User>;
}
