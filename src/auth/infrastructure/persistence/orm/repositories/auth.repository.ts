import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../../../application/ports/auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/orm/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrmAuthRepository implements AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
  ) {}

  isUserExist(email: string): boolean {
    const user = this.authRepository.findOne({ where: { email } });
    return !!user;
  }
}
