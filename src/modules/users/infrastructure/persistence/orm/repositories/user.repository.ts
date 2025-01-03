import { UserRepository } from '../../../../application/ports/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../../domain/user';
import { UserMapper } from '../mappers/user.mapper';
import { UpdateUserRequestDto } from 'src/modules/users/presenters/http/dto/update-user.request-dto';
import { GenericFilterDto } from '../../../../../core/application/ports/generic-filter.dto';

@Injectable()
export class OrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findBy(id: string): Promise<User | null> {
    const entity: UserEntity | null = await this.userRepository.findOneBy({
      id,
    });

    if (!entity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return UserMapper.toDomain(entity);
  }

  public async findAll(filter: GenericFilterDto): Promise<User[]> {
    const entities: UserEntity[] = await this.userRepository.find({
      take: filter.limit,
      skip: (filter.page - 1) * filter.limit,
    });
    return entities.map((item) => UserMapper.toDomain(item));
  }

  public async save(user: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(user);
    const newEntity = await this.userRepository.save(persistenceModel);
    return UserMapper.toDomain(newEntity);
  }

  public async update(
    id: string,
    updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<User> {
    throw new Error('Method not implemented.');
  }

  public async delete(id: string): Promise<User> {
    const entity: UserEntity | null = await this.userRepository.findOneBy({
      id,
    });

    if (!entity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const userEntity: UserEntity = await this.userRepository.remove(entity);
    return UserMapper.toDomain(userEntity);
  }
}
