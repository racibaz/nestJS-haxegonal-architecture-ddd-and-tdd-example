import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '../presenters/http/users.controller';
import { UserFactory } from '../domain/factories/user.factory';
import { OrmUserPersistenceModule } from '../infrastructure/persistence/orm/orm-persistence.module';
import { HasherService } from '../../auth/application/hasher-service';
import { UserEntity } from '../infrastructure/persistence/orm/entities/user.entity';
import { User } from '../domain/user';
import { UserMapper } from '../infrastructure/persistence/orm/mappers/user.mapper';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../../auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    HasherService,
    UserFactory,
    User,
    UserEntity,
    UserMapper,
  ],
  imports: [
    OrmUserPersistenceModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [
    OrmUserPersistenceModule,
    UserFactory,
    User,
    UserEntity,
    UserMapper,
  ],
})
export class UsersModule {}
