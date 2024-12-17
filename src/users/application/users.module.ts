import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '../presenters/http/users.controller';
import { UserFactory } from '../domain/factories/user.factory';
import { OrmUserPersistenceModule } from '../infrastructure/persistence/orm/orm-persistence.module';
import { AuthController } from '../presenters/http/auth.controller';
import { AuthService } from './auth-service';
import { HasherService } from './hasher-service';

@Module({
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService, HasherService, UserFactory],
  imports: [OrmUserPersistenceModule],
  exports: [OrmUserPersistenceModule, UserFactory],
})
export class UsersModule {}
