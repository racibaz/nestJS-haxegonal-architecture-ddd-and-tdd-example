import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../../../application/ports/auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/orm/entities/user.entity';
import { Repository } from 'typeorm';
import { User } from '../../../../../users/domain/user';
import { UserMapper } from '../../../../../users/infrastructure/persistence/orm/mappers/user.mapper';

@Injectable()
export class OrmAuthRepository implements AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
  ) {}

  public async findByOneEmail(email: string): Promise<UserEntity | null> {
    return await this.authRepository.findOne({ where: { email } });
  }

  public async isUserExist(email: string): Promise<boolean> {
    const user = await this.authRepository.findOne({ where: { email } });
    return !!user;
  }

  public async save(user: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(user);
    const newEntity = await this.authRepository.save(persistenceModel);
    return UserMapper.toDomain(newEntity);
  }
}
