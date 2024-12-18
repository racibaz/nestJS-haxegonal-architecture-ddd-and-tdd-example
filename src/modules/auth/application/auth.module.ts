import { Module } from '@nestjs/common';
import { AuthController } from '../presenters/http/auth.controller';
import { AuthService } from './auth-service';
import { HasherService } from './hasher-service';
import { UsersModule } from '../../users/application/users.module';
import { User } from '../../users/domain/user';
import { OrmAuthPersistenceModule } from '../infrastructure/orm-persistence.module';
import { UserMapper } from '../../users/infrastructure/persistence/orm/mappers/user.mapper';
import { HashingProvider } from './ports/hashing.provider';
import { BcryptProvider } from '../infrastructure/persistence/hashing/bcrypt.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    HasherService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  imports: [OrmAuthPersistenceModule, UsersModule, User, UserMapper],
  exports: [OrmAuthPersistenceModule],
})
export class AuthModule {}
