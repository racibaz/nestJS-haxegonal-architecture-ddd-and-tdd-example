import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '../presenters/http/users.controller';
import { UserFactory } from '../domain/factories/user.factory';
import { OrmUserPersistenceModule } from '../infrastructure/persistence/orm/orm-persistence.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserFactory],
  imports: [OrmUserPersistenceModule],
  exports: [OrmUserPersistenceModule, UserFactory],
})
export class UsersModule {}
