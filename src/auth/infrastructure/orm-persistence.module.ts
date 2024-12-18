import { Module } from '@nestjs/common';
import { AuthRepository } from '../application/ports/auth.repository';
import { OrmAuthRepository } from './persistence/orm/repositories/auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../users/infrastructure/persistence/orm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: AuthRepository,
      useClass: OrmAuthRepository,
    },
  ],
  exports: [AuthRepository],
})
export class OrmAuthPersistenceModule {}
