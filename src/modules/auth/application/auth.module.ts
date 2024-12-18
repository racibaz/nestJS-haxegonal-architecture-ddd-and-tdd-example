import { Module } from '@nestjs/common';
import { AuthController } from '../presenters/http/auth.controller';
import { AuthService } from './auth-service';
import { UsersModule } from '../../users/application/users.module';
import { User } from '../../users/domain/user';
import { OrmAuthPersistenceModule } from '../infrastructure/orm-persistence.module';
import { UserMapper } from '../../users/infrastructure/persistence/orm/mappers/user.mapper';
import { HashingProvider } from './ports/hashing.provider';
import { BcryptProvider } from '../infrastructure/persistence/hashing/bcrypt.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  imports: [
    OrmAuthPersistenceModule,
    UsersModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    User,
    UserMapper,
  ],
  exports: [OrmAuthPersistenceModule],
})
export class AuthModule {}
