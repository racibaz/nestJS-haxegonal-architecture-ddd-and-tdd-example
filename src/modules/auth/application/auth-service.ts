import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HasherService } from './hasher-service';
import { LoginUserCommand } from './commands/login-user.command';
import { RegisterUserCommand } from './commands/register-user.command';
import { AuthRepository } from './ports/auth.repository';
import { UserFactory } from '../../users/domain/factories/user.factory';
import { UserEntity } from '../../users/infrastructure/persistence/orm/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly hasherService: HasherService,
    private readonly userFactory: UserFactory,
  ) {}

  async register(registerUserCommand: RegisterUserCommand) {
    const isUserExist = await this.authRepository.isUserExist(
      registerUserCommand.email,
    );

    if (isUserExist) {
      throw new HttpException('User already exists', HttpStatus.NOT_FOUND);
    }

    registerUserCommand.password = await this.hasherService.hashPassword(
      registerUserCommand.password,
    );

    const user = this.userFactory.create(
      registerUserCommand.name,
      registerUserCommand.email,
      registerUserCommand.password,
    );

    return await this.authRepository.save(user);
  }

  @HttpCode(HttpStatus.OK)
  async login(loginUserCommand: LoginUserCommand) {
    const user: UserEntity | null = await this.authRepository.findBy(
      loginUserCommand.email,
    );

    if (!user) {
      throw new UnauthorizedException('The email or password does not match');
    }

    const isMatch = await bcrypt.compare(
      loginUserCommand.password,
      user?.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('The email or password does not match');
    }


  }
}
